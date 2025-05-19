import express from 'express';
import { checkAuthController, loginController, logoutController, registerController } from '../controllers/authControllers.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

// Route for user registration
router.post('/register', registerController);
// Route for user login
router.post('/login', loginController);
// Route to check authentication status
router.get('/check-auth',protectRoute,checkAuthController)
router.get('/logout',protectRoute,logoutController);
export default router