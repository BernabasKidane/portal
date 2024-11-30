import Resource from "../models/Resource.js";

// Controller for file upload
export const uploadResource = async (req, res) => {
  const { type, title, description } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required." });
    }

    const resource = new Resource({
      type,
      title,
      description,
      content: `/uploads/${req.file.filename}`,
    });

    await resource.save();
    res.status(201).json({ message: "Resource uploaded successfully", resource });
  } catch (error) {
    console.error("Error uploading resource:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

// Get count of all resources
export const getResourceCount = async (req, res) => {
  try {
    const count = await Resource.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching resource count:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

// Route to get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find(); // Fetch all resources
    res.status(200).json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

// Route to get all PDF resources
export const getPdfResources = async (req, res) => {
  try {
    const pdfResources = await Resource.find({ type: 'pdf' });
    res.status(200).json(pdfResources);
  } catch (error) {
    console.error("Error fetching PDF resources:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};