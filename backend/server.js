import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import fileRoutes from "./routes/fileRoutes.js";
import "./utils/deleteOldFiles.js"; // Import cron job to auto-delete files

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("FileShare API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
