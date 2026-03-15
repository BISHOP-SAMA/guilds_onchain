import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";

const app = express();
const rootDir = process.cwd(); 

app.use(cors());
app.use(express.json());

// 1. API Routes
app.use("/api", router);

// 2. Serve static files
// We point to the 'dist' folder inside the guilds-platform artifact
const clientDistPath = path.resolve(rootDir, "artifacts/guilds-platform/dist");

app.use(express.static(clientDistPath));

// 3. Catch-all for React
app.get("*", (_req, res) => {
  // We use path.join to safely point to the index.html in that dist folder
  res.sendFile(path.join(clientDistPath, "index.html"));
});

export default app;
