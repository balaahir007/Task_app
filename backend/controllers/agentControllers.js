import {
  createAgent,
  deleteAgentById,
  getAllAgents,
  getAgentById,
  updateAgentById
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

// Delete Agent
export const deleteAgentController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAgentById(id);
    return res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error("Delete Agent Error:", error.message);
    return res.status(400).json({ message: error.message || 'Agent deletion failed' });
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

// Get Agent by ID
export const getAgentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await getAgentById(id);
    return res.status(200).json(agent);
  } catch (error) {
    console.error("Get Agent Error:", error.message);
    return res.status(404).json({ message: error.message || 'Agent not found' });
  }
};

// Update Agent
export const updateAgentController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAgent = await updateAgentById(id, updatedData);
    return res.status(200).json(updatedAgent);
  } catch (error) {
    console.error("Update Agent Error:", error.message);
    return res.status(400).json({ message: error.message || 'Agent update failed' });
  }
};
