import express from 'express';
import multer from 'multer';
import { uploadTasksController } from '../controllers/taskControllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-tasks', upload.single('file'), uploadTasksController);

export default router;
