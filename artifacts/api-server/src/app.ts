import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";

const app = express();

// Use process.cwd() to find the root folder safely on Railway
const rootDir = process.cwd(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API Routes
app.use("/api", router);

// 2. Serve static files
// We point to the build folder where Railway stores the frontend
const clientDistPath = path.resolve(rootDir, "artifacts/guilds-platform/dist");

app.use(express.static(clientDistPath));

// 3. Catch-all for React routing
// This ensures that refreshing the page on /leaderboard doesn't 404
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

export default app;
