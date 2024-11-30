import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import quizRoutes from './routes/quiz.route.js';
import customerFollowUpRoutes from './routes/customerFollowRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import ResourceRoute from './routes/ResourceRoutes.js';
import FollowUpRoutes from "./routes/followupRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use(express.json());

// Define API routes
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/followup', customerFollowUpRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/resources', ResourceRoute);
app.use("/api/followups", FollowUpRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});