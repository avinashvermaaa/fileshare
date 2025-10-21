import admin from "firebase-admin";
import { config } from "./config.js";

if (!config.firebase.serviceAccount) {
  console.error("Firebase service account JSON is missing in environment variables!");
  process.exit(1);
}

const serviceAccount = JSON.parse(config.firebase.serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL,
});

const db = admin.firestore();

export { db };
