import express from "express";
import type { Application } from "express";
import cors from "cors";
import router from "./routes/index.js";  // point to index.js inside the folder

const app: Application = express();  // Application instead of Express

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;