import cloudinary from "cloudinary";
import File from "../models/File.js";
import dotenv from "dotenv";

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader
      .upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) return res.status(500).json({ error });
        const file = new File({
          filename: req.file.originalname,
          url: result.secure_url,
          public_id: result.public_id,
        });
        await file.save();
        res.json({ id: file._id, url: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
