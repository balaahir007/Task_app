import path from 'path';
import fs from 'fs';
import { parseCSV } from '../utils/parser.js';

export const uploadTasks = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const data = await parseCSV(file.path);
  fs.unlinkSync(file.path); // remove after parsing

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Empty or invalid file content');
  }

  console.log("Data after parsing:", data);
  return data;
};
