import express from 'express';
import { login, register, getProfile, logout, getOtherUsers } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
const router = express.Router();


// router.get('/login', func1, func2, login);

router.post('/register', register);
router.post('/login', login);
router.get('/get-profile', isAuthenticated, getProfile);
router.post('/logout', isAuthenticated, logout);
router.get('/get-other-users', isAuthenticated, getOtherUsers);

export default router;