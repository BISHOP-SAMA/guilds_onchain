import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";

const app = express();
const rootDir = process.cwd(); // This is the "safe" way to find your folder

app.use(cors());
app.use(express.json());

// 1. All API routes go through the /api prefix
app.use("/api", router);

// 2. Set the path to your frontend dist folder
const clientDistPath = path.resolve(rootDir, "artifacts/guilds-platform/dist");
app.use(express.static(clientDistPath));

// 3. Keep React routing alive
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

export default app;
