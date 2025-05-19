// middlewares/isAdmin.js
import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";
const isAdmin = async(req, res, next) => {
  try {
    const token = req.cookies?.jwt || req.headers?.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Access token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); 
    
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAdmin