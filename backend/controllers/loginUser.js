import express from 'express';
import { loginUser, protect } from '../controllers/user.controller.js';

const router = express.Router();

// Login user
router.post('/login', loginUser);

// Example protected route
router.get('/protected', protect, (req, res) => {
    res.send('This is a protected route');
});

export default router;
