import { uploadTasks } from '../helper/upload.js';
import assignTasksToAgents from '../models/taskModel.js';

export const uploadTasksController = async (req, res) => {
  try {
    const file = req.file;
    console.log("File received:", file);
    
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const taskData = await uploadTasks(file);
    const newTask = await assignTasksToAgents(taskData);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  } 
};
