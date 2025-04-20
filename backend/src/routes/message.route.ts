import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
    sendMessage,
    getMessages,
    getUsersForSidebar,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get('/conversations',(() => console.log("getConversations called")), protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;