import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router = express.Router();


router.post('/send/:receiverId', isAuthenticated, sendMessage);
router.get('/get-messages/:otherParticipantId', isAuthenticated, getMessages);

export default router;