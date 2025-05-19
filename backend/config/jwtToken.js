import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    if (!token) {
      throw new Error("Token generation failed");
    }

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",                  // Added path for consistency
    });

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default generateToken;
