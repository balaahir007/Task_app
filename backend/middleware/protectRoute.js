import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";

const protectRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "No token found. Please login first." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found. Please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res
      .status(401)
      .json({ error: "Invalid or expired token. Please log in again." });
  }
};

export default protectRoute;
