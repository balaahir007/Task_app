import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config()
import connectDB from "./db/connectDB.js";


const app = express();
app.use(cookieParser());
app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true,
}));
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use('/api/agent',agentRoutes)
app.use('/api/task',taskRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB()
});
