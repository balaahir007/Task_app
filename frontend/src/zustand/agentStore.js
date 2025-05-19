import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAgentStore = create((set) => ({
  agents: [],
  isAgentLoading: false,
  agentError: null, // renamed from `error`

  // Fetch agents
  fetchAllAgents: async () => {
    set({ isAgentLoading: true, agentError: null });
    try {
      const response = await axiosInstance.get("/agent/getAllAgents");
      set({ agents: response.data || [], isAgentLoading: false });
    } catch (error) {
      console.error("Error fetching agents:", error);
      set({ isAgentLoading: false, agentError: "Failed to load agents" });
    }
  },

  createNewAgent: async (agentData) => {
    set({ isAgentLoading: true, agentError: null });
    try {
      const response = await axiosInstance.post("/agent/create", { agentData });
      set((state) => ({
        agents: [...state.agents, ...(response.data || [])],
        isAgentLoading: false,
      }));
    } catch (error) {
      console.error("Error creating agent:", error);
      set({ isAgentLoading: false, agentError: "Failed to create agent" });
    }
  },

  removeAgent: async (id) => {
    set({ isAgentLoading: true, agentError: null });
    try {
      await axiosInstance.delete(`/agent/${id}`);
      set((state) => ({
        agents: state.agents.filter((agent) => agent._id !== id),
        isAgentLoading: false,
      }));
    } catch (error) {
      console.error("Error removing agent:", error);
      set({ isAgentLoading: false, agentError: "Failed to remove agent" });
    }
  },
}));

export default useAgentStore;
