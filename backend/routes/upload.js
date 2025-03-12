const express = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sharekaro-files",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const fileUrls = req.files.map((file) => file.path);
    res.json({ success: true, fileUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;
