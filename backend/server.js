import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import cors from "cors";
import cloudinaryModule from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v4 as uuidv4 } from "uuid";
import admin from "firebase-admin";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const SERVER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

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

// Firebase Setup
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error(
    "❌ Firebase service account JSON is missing in environment variables!"
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();

// Configure Multer for Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sharekaro-files",
    resource_type: "auto",
    access_mode: "public", // Ensures files are publicly accessible
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Get the Cloudinary URLs for the uploaded files
    const fileUrls = req.files.map((file) => file.path);
    const shortLinks = [];
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    for (const url of fileUrls) {
      const shortId = uuidv4().slice(0, 6);
      await db.collection("files").doc(shortId).set({
        url,
        expiresAt: expirationTime,
      });
      shortLinks.push(`${SERVER_URL}/file/${shortId}`);
    }

    res.status(200).json({
      message: "Files uploaded successfully!",
      fileUrls,
      shortLinks,
    });
  } catch (error) {
    console.error("❌ Error uploading files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve File by Short Link
app.get("/file/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fileRef = db.collection("files").doc(id);
    const fileDoc = await fileRef.get();

    if (!fileDoc.exists) {
      return res.status(404).json({ message: "❌ File not found or expired" });
    }

    const fileData = fileDoc.data();
    if (Date.now() > fileData.expiresAt) {
      await fileRef.delete();
      return res.status(410).json({ message: "⚠️ File link expired" });
    }

    res.redirect(fileData.url);
  } catch (error) {
    console.error("❌ Error retrieving file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${SERVER_URL}`);
});
