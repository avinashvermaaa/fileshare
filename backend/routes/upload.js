import multer from "multer";
import { storage } from "../cloudinary.js";
import { db } from "../firebase.js";
import { v4 as uuidv4 } from "uuid";
import { config } from "../config.js";
import { logRequest } from '../utils/logger.js';

const upload = multer({ storage });

const handleFileUpload = async (req, res) => {
  try {

    await logRequest({
      ip: req.ip,
      endpoint: "/upload",
      method: "POST",
    });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileUrls = req.files.map((file) => file.path);
    const shortLinks = [];
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;

    for (const url of fileUrls) {
      const shortId = uuidv4().slice(0, 6);
      await db.collection("files").doc(shortId).set({
        url,
        expiresAt: expirationTime,
      });
      shortLinks.push(`${config.server.serverUrl}/file/${shortId}`);
    }

    res.status(200).json({
      message: "Files uploaded successfully!",
      fileUrls,
      shortLinks,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { upload, handleFileUpload };
