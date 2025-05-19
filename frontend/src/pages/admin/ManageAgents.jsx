import AddAgentForm from "../../components/AddAgentForm";
import { FaUserPlus } from "react-icons/fa";
import AgentOverviewCard from "../../components/AgentOverviewCard";
import useAgentStore from "../../zustand/agentStore";
import { useState, useEffect } from "react";

const ManageAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchAllAgents, agents } = useAgentStore();
  const [isAgentLoading, setIsAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState(null);

  const getAllAgents = async () => {
    try {
      setIsAgentLoading(true);
      await fetchAllAgents();
    } catch (error) {
      setAgentError("Failed to load agents");
    } finally {
      setIsAgentLoading(false);
    }
  };

  useEffect(() => {
    getAllAgents();
  }, []);

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 min-h-screen bg-gray-50">
      {/* Top Section: Heading and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700">Agents</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <FaUserPlus className="text-white" />
          <span className="hidden md:inline">Add Agent</span>
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search agents by name..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Agents List / Loading Spinner / Error */}
      {agentError && (
        <p className="text-red-600 mb-4 font-semibold">{agentError}</p>
      )}

      {isAgentLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

      ) : filteredAgents && filteredAgents.length > 0 ? (
        filteredAgents.map((agent) => (
          <AgentOverviewCard key={agent._id} agent={agent} />
        ))
      ) : (
        <p>No agents found.</p>
      )}

      {/* Modal */}
      {isModalOpen && <AddAgentForm setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default ManageAgents;
