import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

const app = express();

// Required to find folders in a modern Node.js environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Handle API requests first
app.use("/api", router);

// 2. Serve the built Frontend files
// This assumes your frontend build goes into a folder called 'dist'
const clientDistPath = path.resolve(__dirname, "../../guilds-platform/dist");
app.use(express.static(clientDistPath));

// 3. The "Catch-All" route
// If a user visits /leaderboard, send them index.html so the frontend Router can take over
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

export default app;
