import cron from "node-cron";
import cloudinary from "cloudinary";
import File from "../models/File.js";
import dotenv from "dotenv";

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteOldFiles = () => {
  cron.schedule("0 * * * *", async () => {
    // Runs every hour
    const oldFiles = await File.find({
      createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    oldFiles.forEach(async (file) => {
      await cloudinary.v2.uploader.destroy(file.public_id);
      await File.findByIdAndDelete(file._id);
    });
    console.log("Old files deleted");
  });
};

export default deleteOldFiles;
