/*
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

*/
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import cors from "cors";
import cloudinaryModule from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend-backend communication
app.use(cors());
app.use(express.json());

// Configure Cloudinary
const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sharekaro-files",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  // Get the Cloudinary URLs for the uploaded files
  const fileUrls = req.files.map((file) => file.path);

  console.log("Uploaded files:", fileUrls);

  res.status(200).json({
    message: "Files uploaded successfully!",
    fileUrls,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
