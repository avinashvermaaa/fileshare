import express from "express";
import { db } from "../firebase.js";
import { logRequest } from '../utils/logger.js';
import { config } from "../config.js";
const router = express.Router();

router.get("/file/:id", async (req, res) => {
  try {
    await logRequest({
      ip: req.ip,
      endpoint: `/file/${req.params.id}`,
      method: "GET",
    });
    const { id } = req.params;
    const fileRef = db.collection("files").doc(id);
    const fileDoc = await fileRef.get();

    if (!fileDoc.exists) {
      return res.status(404).json({ message: "File not found or expired" });
    }

    const fileData = fileDoc.data();
    if (Date.now() > fileData.expiresAt) {
      await fileRef.delete();
      return res.status(410).json({ message: "⚠️ File link expired" });
    }

    res.redirect(fileData.url);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router };
