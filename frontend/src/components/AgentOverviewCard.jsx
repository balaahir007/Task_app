import { FiMail, FiPhone, FiUser } from "react-icons/fi";

const AgentOverviewCard = ({ agent }) => {
  
  return (
    <div className="bg-white mb-4 rounded-2xl shadow-xl hover:shadow-2xl p-6 relative transition-all duration-300 flex flex-col space-y-4 border border-gray-200">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiUser className="text-indigo-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{agent?.name || "Unnamed Agent"}</h2>
            <span className="text-sm text-gray-500">{agent?.role || "Field Agent"}</span>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="text-sm text-gray-700 space-y-2">
        <p className="flex items-center gap-2">
          <FiMail className="text-indigo-500" />
          <span>{agent?.email || "Not Available"}</span>
        </p>
        <p className="flex items-center gap-2">
          <FiPhone className="text-indigo-500" />
          <span>{agent?.mobile || "Not Available"}</span>
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* Task Section */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          Assigned Tasks ({agent.tasks?.length ?? 0})
        </h3>

        {agent.tasks && agent.tasks.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {agent.tasks.map((task, idx) => (
              <li key={idx}>
                <strong>{task.firstName}</strong> - {task.phone}
                {task.notes && <em className="ml-1 text-gray-500">({task.notes})</em>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default AgentOverviewCard;
