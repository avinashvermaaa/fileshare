import express from "express";
import upload from "../utils/multer.js";
import File from "../models/File.js";

const router = express.Router();

// Upload File Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { originalname } = req.file;
    const file = await File.create({
      filename: originalname,
      url: req.file.path,
    });

    res.json({ fileId: file._id, url: file.url });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
});

// Get File Route
router.get("/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    res.json({ url: file.url });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving file" });
  }
});

export default router;
