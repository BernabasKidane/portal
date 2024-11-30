import Followup from "../models/Followup.js";
import mongoose from "mongoose"; // <-- Add this line

// @desc    Add a new follow-up
// @route   POST /api/followups
// @access  Public
const createFollowup = async (req, res) => {
  const {
    clientName,
    companyName,
    phoneNumber,
    email,
    packageType,
    serviceProvided,
    serviceNotProvided,
    deadline,
  } = req.body;

  try {
    const followup = new Followup({
      clientName,
      companyName,
      phoneNumber,
      email,
      packageType,
      serviceProvided,
      serviceNotProvided,
      deadline,
    });

    const savedFollowup = await followup.save();
    res.status(201).json(savedFollowup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all follow-ups
// @route   GET /api/followups
// @access  Public
const getFollowups = async (req, res) => {
  try {
    const followups = await Followup.find();
    res.status(200).json(followups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a follow-up by ID
// @route   GET /api/followups/:id
// @access  Public
const getFollowupById = async (req, res) => {
  try {
    const followup = await Followup.findById(req.params.id);
    if (!followup) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    res.status(200).json(followup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a follow-up
// @route   PUT /api/followups/:id
// @access  Public
const updateFollowup = async (req, res) => {
  try {
    const followup = await Followup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!followup) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    res.status(200).json(followup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a follow-up
// @route   DELETE /api/followups/:id
// @access  Public
const deleteFollowup = async (req, res) => {
  try {
    const followup = await Followup.findByIdAndDelete(req.params.id);
    if (!followup) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    res.status(200).json({ message: "Follow-up deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a note to a follow-up
// @route   POST /api/followups/:id/notes
// @access  Public
const addNote = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Note text is required." });
  }

  try {
    const followup = await Followup.findById(req.params.id);
    if (!followup) {
      return res.status(404).json({ message: "Follow-up not found." });
    }

    followup.notes.push({ text });
    const updatedFollowup = await followup.save();

    res.status(200).json(updatedFollowup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update the last called date
// @route   PATCH /api/followups/:id/lastCalled
// @access
// Update lastCalled for a specific follow-up
export const updateLastCalled = async (req, res) => {
  try {
    const { id } = req.params;
    const currentTime = new Date();
    const updatedFollowup = await Followup.findByIdAndUpdate(
      id,
      { $set: { lastCalled: currentTime } },
      { new: true, runValidators: true }
    );

    if (!updatedFollowup) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    res.status(200).json(updatedFollowup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update lastCalled", error: error.message });
  }
};
// ////////////////
// File: /backend/controllers/followupController.js
// const Followup = require("../models/followup");

const getCustomerStats = async (req, res) => {
  try {
    // Total customers
    const total = await Followup.countDocuments();
    console.log(`Total customers: ${total}`);

    // New customers: Followups created in the last 30 days
    const newCount = await Followup.countDocuments({
      createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
    });
    console.log(`New customers in last 365 days: ${newCount}`);

    // Active customers: Followups with a recent "last called" date (within the last 30 days)
    const activeCount = await Followup.countDocuments({
      lastCalled: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
    });
    console.log(`Active customers in last 365 days: ${activeCount}`);

    res.json({
      total,
      new: newCount,
      active: activeCount,
    });
  } catch (error) {
    console.error("Error fetching customer stats:", error);
    res
      .status(500)
      .json({ message: "Error fetching customer stats", error: error.message });
  }
};

// Update Service Provided and Service Not Provided
// In your updateServices controller
const updateServices = async (req, res) => {
  const { id } = req.params;
  const { serviceProvided, serviceNotProvided } = req.body; // Get the services from the request body

  // Log the request body to check if the data is being sent correctly
  console.log("Request body:", req.body);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Update the followup with the new services
    const updatedFollowup = await Followup.findByIdAndUpdate(
      id,
      { serviceProvided, serviceNotProvided },
      { new: true } // Return the updated document
    );

    if (!updatedFollowup) {
      return res.status(404).json({ message: "Followup not found" });
    }

    // Return the updated followup
    return res.json(updatedFollowup);
  } catch (error) {
    console.error("Error updating services:", error);
    return res
      .status(500)
      .json({ message: "Error updating services", error: error.message });
  }
};

export default {
  getFollowups,
  getFollowupById,
  createFollowup,
  updateFollowup,
  deleteFollowup,
  addNote,
  updateLastCalled,
  getCustomerStats,
  updateServices,
};
