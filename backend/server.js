import express from "express";
import cors from "cors";
import { upload, handleFileUpload } from "./routes/upload.js";
import { router as fileRoutes } from "./routes/fileRoutes.js";
import { config } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
// File upload route
app.post("/upload", upload.array("files"), handleFileUpload);

// File retrieval routes
app.use(fileRoutes);

// Start server
app.listen(config.server.port, () => {
  console.log(`🚀 Server running at ${config.server.serverUrl}`);
});
