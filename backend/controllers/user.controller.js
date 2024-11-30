import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// User login function
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Successful login, return user's username, role, status, token, and user ID
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id, // Include user ID
                username: user.username,
                role: user.role,
                status: user.status,
            }
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Create a new user
export const createuser = async (req, res) => {
    const { username, email, password, role, status } = req.body; // Include role and status

    if (!username || !email || !password || !role) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // Set default status if not provided
        const userStatus = status || (role === "admin" || role === "HR" ? "active" : "inactive");

        const newUser = new User({ username, email, password, role, status: userStatus }); // Include role and status here
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });

    } catch (error) {
        console.error("Error in creating user:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all users
export const getuser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update user by ID
export const updateuser = async (req, res) => {
    const { id } = req.params;
    const userUpdates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user ID" });
    }

    try {
        // Update user and return the updated user
        const updatedUser = await User.findByIdAndUpdate(id, userUpdates, { new: true });
        res.status(200).json({ success: true, message: "User updated successfully!", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};

// Delete user by ID
export const deleteuser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted" });
        console.log("User deleted:", id);
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get user counts
export const getUserCounts = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ status: 'active' });
      res.status(200).json({ totalUsers, activeUsers });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };