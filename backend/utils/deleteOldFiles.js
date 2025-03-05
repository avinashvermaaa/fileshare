import cron from "node-cron";
import File from "../models/File.js";
import cloudinary from "./cloudinary.js";

// Run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Checking for expired files...");

  const files = await File.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });

  for (const file of files) {
    const publicId = file.url.split("/").pop().split(".")[0]; // Extract Cloudinary ID
    await cloudinary.uploader.destroy(publicId);
    await file.deleteOne();
    console.log(`Deleted file: ${file.filename}`);
  }
});

export default cron;
