import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();  // no type annotation, let TS infer it

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;