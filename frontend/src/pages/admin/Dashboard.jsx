import React from "react";
import AgentCard from "../../components/AgentCard";
import useAgentStore from "../../zustand/agentStore";
import { useEffect } from "react";

const Dashboard = () => {
      const {fetchAllAgents,agents} = useAgentStore()
      useEffect(()=>{
        const fetchAgents = async () => {
          await fetchAllAgents();
        };
        fetchAgents();
      },[])
      console.log(agents);
      
    const totalTasksDistributed = agents.reduce((acc, agent) => acc + (agent.tasks?.length || 0), 0);

  return (
    <main className="flex-1 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 mt-10 md:mt-0">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">Total Agents</h2>
          <p className="text-4xl font-semibold text-gray-800">{agents.length || 0}</p>
        </div>

        {/* Card 2 */}


        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">Tasks Distributed</h2>
          <p className="text-4xl font-semibold text-gray-800">{totalTasksDistributed || 0}</p>
        </div>
      </div>

      <section className="mt-10">
  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
    All Agents
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {agents && agents.length > 0 ? (
      agents.map(agent => (
        <AgentCard key={agent._id} agent={agent} />
      ))
    ) : (
      <p>No agents found.</p>
    )}
  </div>
</section>

    </main>
  );
};

export default Dashboard;
