import generateToken from "../config/jwtToken.js";
import { loginUser, registerUser } from "../models/authModels.js";
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    generateToken(user._id, res);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(400).json({ message: error.message || "Login failed" });
  }
};

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    generateToken(user._id, res);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Register Error:", error.message);
    return res
      .status(400)
      .json({ message: error.message || "Registration failed" });
  }
};
export const checkAuthController = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.error("Check Auth Error:", error.message);
    return res
      .status(401)
      .json({ message: error.message || "Authentication check failed" });
  }
};
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",                 
      secure: process.env.NODE_ENV === "production", 
      path: "/",                          
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ message: error.message || "Logout failed" });
  }
};

