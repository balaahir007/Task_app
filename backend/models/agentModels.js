import Agent from "../schema/agentSchema.js";
import bcrypt from "bcrypt";
import Task from "../schema/taskschema.js";

export const createAgent = async (agentData, adminId) => {
  const { name, email, mobile, password } = agentData;

  if (!name || !email || !mobile || !password) {
    throw new Error("All fields are required");
  }

  // Optional: check if agent email or mobile already exists (prevent duplicates)
  const existingAgent = await Agent.findOne({ $or: [{ email }, { mobile }] });
  if (existingAgent) {
    throw new Error("Agent with given email or mobile already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAgent = new Agent({
    name,
    email,
    mobile,
    password: hashedPassword,
    createdBy: adminId,
  });

  const savedAgent = await newAgent.save();
  return savedAgent;
};

// Delete agent by ID
export const deleteAgentById = async (id) => {
  const deletedAgent = await Agent.findByIdAndDelete(id);
  if (!deletedAgent) {
    throw new Error("Agent not found");
  }
  return deletedAgent;
};

// Get all agents
export const getAllAgents = async () => {
  const agentsWithTasks = await Agent.find().populate("tasks");
  return agentsWithTasks;
};

// Get agent by ID
export const getAgentById = async (id) => {
  const agent = await Agent.findById(id);
  if (!agent) {
    throw new Error("Agent not found");
  }
  return agent;
};

// Update agent by ID
export const updateAgentById = async (id, updatedData) => {
  // Prevent password updates here directly; handle separately if needed
  if (updatedData.password) {
    delete updatedData.password;
  }

  const updatedAgent = await Agent.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedAgent) {
    throw new Error("Agent not found");
  }
  return updatedAgent;
};


