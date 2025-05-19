import express from "express";
import {
  createAgentController,
  getAllAgentsController,

} from "../controllers/agentControllers.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

router.post("/create", isAdmin, createAgentController);
router.get("/getAllAgents", isAdmin, getAllAgentsController);




export default router;
