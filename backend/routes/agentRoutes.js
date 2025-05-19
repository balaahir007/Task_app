import express from "express";
import {
  createAgentController,
  deleteAgentController,
  getAllAgentsController,
  getAgentByIdController,
  updateAgentController,
} from "../controllers/agentControllers.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

router.post("/create", isAdmin, createAgentController);
router.get("/getAllAgents", isAdmin, getAllAgentsController);
router.get("/:id", isAdmin, getAgentByIdController);
router.put("/:id", isAdmin, updateAgentController);
router.delete("/:id", isAdmin, deleteAgentController);



export default router;
