import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fileshare",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

export default upload;
