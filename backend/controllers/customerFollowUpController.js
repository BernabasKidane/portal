import CustomerFollowUp from '../models/customerFollowUp.js';  // Include '.js'

// Create a new follow-up
export const createFollowUp = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, followUpDate, status, notes } = req.body;

    // Check if the email already exists
    const existingFollowUp = await CustomerFollowUp.findOne({ email });
    if (existingFollowUp) {
      return res.status(400).json({ error: 'This email already exists.' });
    }

    const followUp = new CustomerFollowUp({
      fullName,
      email,
      phoneNumber,
      followUpDate,
      status,
      notes,
    });

    await followUp.save();
    res.status(201).json(followUp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all follow-ups
export const getAllFollowUps = async (req, res) => {
  try {
    const followUps = await CustomerFollowUp.find();
    res.status(200).json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a follow-up
export const updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNumber, followUpDate, status, notes } = req.body;

    const followUp = await CustomerFollowUp.findByIdAndUpdate(
      id,
      { fullName, email, phoneNumber, followUpDate, status, notes },
      { new: true }
    );

    if (!followUp) {
      return res.status(404).json({ error: 'Follow-up not found' });
    }

    res.status(200).json(followUp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a follow-up
export const deleteFollowUp = async (req, res) => {
  try {
    const { id } = req.params;

    const followUp = await CustomerFollowUp.findByIdAndDelete(id);

    if (!followUp) {
      return res.status(404).json({ error: 'Follow-up not found' });
    }

    res.status(200).json({ message: 'Follow-up deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get count of all follow-ups
export const getFollowUpCount = async (req, res) => {
  try {
    const count = await CustomerFollowUp.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};