import Agent from "../schema/agentSchema.js";
import Task from "../schema/taskschema.js";

export const assignTasksToAgents = async (tasksData) => {
  // 1. Fetch all agents from DB
  const agents = await Agent.find();
  const totalAgents = agents.length;

  if (totalAgents === 0) {
    throw new Error("No agents found to assign tasks");
  }

  // 2. Prepare an array to hold <task></task> arrays per agent
  const tasksForAgent = Array.from({ length: totalAgents }, () => []);

  // 3. Distribute tasks evenly using modulo
  tasksData.forEach((task, index) => {
    const agentIndex = index % totalAgents;
    tasksForAgent[agentIndex].push(task);
  });

  // 4. For each agent, create tasks in DB and update agent's tasks array
  let totalTasksCreated = 0;
  for (let i = 0; i < totalAgents; i++) {
    const agent = agents[i];
    const tasks = tasksForAgent[i];

    for (const taskData of tasks) {
      const newTask = await Task.create({
        firstName: taskData.firstName,
        phone: taskData.phone,
        notes: taskData.notes || "",
        assignedTo: agent._id,
      });
      agent.tasks.push(newTask._id);
      totalTasksCreated++;
    }

    await agent.save();
    console.log(agent);
  }

  return `Assigned ${totalTasksCreated} tasks among ${totalAgents} agents`;
};
export default assignTasksToAgents;