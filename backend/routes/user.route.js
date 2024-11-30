import express from "express";
import { createuser, deleteuser, getuser, updateuser, loginUser, getUserCounts } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", loginUser); // Login route
router.post("/", createuser); // Create user
router.get('/', getuser); // Get users
router.get('/count', getUserCounts); // New endpoint for user counts
router.put('/:id', updateuser); // Update user
router.delete('/:id', deleteuser); // Delete user

export default router;