import express from 'express';
import {
    login,
    logout,
    signup,
    getAuthenticatedUser,
} from "../controllers/auth.controller.js";
import protectRoute from '../middleware/protectRoute.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/me', protectRoute, asyncHandler(getAuthenticatedUser));
router.get('/logout', asyncHandler(logout));
router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

export default router;
