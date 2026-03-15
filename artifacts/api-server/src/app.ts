import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";

const app = express();

// Fix for Railway's index.cjs build
const rootDir = process.cwd(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API Routes
app.use("/api", router);

// 2. Serve static files using process.cwd() instead of __dirname
// This points to the root where the 'dist' folder actually lives on Railway
const clientDistPath = path.resolve(rootDir, "artifacts/guilds-platform/dist");

app.use(express.static(clientDistPath));

// 3. Catch-all for React routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

export default app;
