import express from "express";
import { getMessages } from "../controllers/messageController.js"; // Named import

const router = express.Router();

router.get("/", getMessages);

export default router; // Use export default
