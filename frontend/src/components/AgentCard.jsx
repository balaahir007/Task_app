import { FiCheckCircle } from 'react-icons/fi';

const AgentCard = ({ agent }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border-l-4 border-indigo-500 flex flex-col">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">{agent?.name || 'Unnamed Agent'}</h3>
      <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
        {agent?.tasks?.length ?? 0} {agent?.tasks?.length === 1 ? 'Task' : 'Tasks'}
      </span>
    </div>

    <div className="mb-6 space-y-2 text-gray-700 text-sm">
      <p><span className="font-semibold text-gray-800">Email:</span> {agent?.email || 'N/A'}</p>
      <p><span className="font-semibold text-gray-800">Mobile:</span> {agent?.mobile || 'N/A'}</p>
    </div>

    <h4 className="text-md font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2 tracking-wide">Assigned Tasks</h4>
    
    <ul className="max-h-56 overflow-y-auto text-gray-700 text-sm space-y-2 pr-2">
      {agent?.tasks && agent.tasks.length > 0 ? (
        agent.tasks.map((task, idx) => (
          <li 
            key={idx} 
            className="flex items-center gap-3 bg-indigo-50 rounded-lg px-3 py-2 hover:bg-indigo-100 transition-colors cursor-default shadow-sm"
          >
            <FiCheckCircle className="text-indigo-500 flex-shrink-0" />
            <div>
              <span className="font-semibold">{task?.firstName}</span> - <span>{task?.phone}</span>
              {task?.notes && <p className="text-gray-500 italic text-xs mt-1">{task?.notes}</p>}
            </div>
          </li>
        ))
      ) : (
        <li className="italic text-gray-400">No tasks assigned</li>
      )}
    </ul>
  </div>
);

export default AgentCard;
