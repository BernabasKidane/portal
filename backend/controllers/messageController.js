import Message from "../models/Message.js"; // Importing Message model using ESM syntax

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const replyToMessage = async (req, res) => {
  try {
    const { messageId, replyText } = req.body;
    // Logic for replying to a message (you can implement your custom logic here)
    const response = await Message.create({ text: replyText, sender: "Admin" });
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
