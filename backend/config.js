import dotenv from "dotenv";

dotenv.config();

export const config = {
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  firebase: {
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  },
  server: {
    port: process.env.PORT || 5000,
    serverUrl: process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`,
  }
};
