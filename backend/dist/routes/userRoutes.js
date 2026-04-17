import express from 'express';
import { signIn, register, logout, profile } from '../controllers/userController.js';
import { middleware } from '../middleware.js';
export const router = express.Router();
router.post('/signin', signIn);
router.post('/register', register);
router.post('/logout', middleware, logout);
router.get('/me', middleware, profile);
//# sourceMappingURL=userRoutes.js.map