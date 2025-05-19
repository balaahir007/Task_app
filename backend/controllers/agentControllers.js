import {
  createAgent,
  getAllAgents,
} from '../models/agentModels.js';

// Create Agent
export const createAgentController = async (req, res) => {
  try {
    console.log("hi");
    
    const {agentData} = req.body;
    console.log(agentData);
    const adminId = req?.user?._id;
    if(!adminId){
        throw new Error("Admin Id is Required")
    }
    const newAgent = await createAgent(agentData,adminId);
    return res.status(201).json(newAgent);
  } catch (error) {
    console.error("Create Agent Error:", error.message);
    return res.status(400).json({ message: error.message || 'Agent creation failed' });
  }
};


// Get All Agents
export const getAllAgentsController = async (req, res) => {
  try {
    const agents = await getAllAgents();
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Get All Agents Error:", error.message);
    return res.status(400).json({ message: error.message || 'Failed to fetch agents' });
  }
};

