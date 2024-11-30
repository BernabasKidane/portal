import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification; // Default export
