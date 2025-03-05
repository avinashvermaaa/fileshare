import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  createdAt: { type: Date, default: Date.now, expires: "24h" }, // Auto delete after 24 hours
});

export default mongoose.model("File", fileSchema);
