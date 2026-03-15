import { Router } from "express";
import healthRouter from "./health.js";
import guildsRouter from "./guild.js";
import membersRouter from "./members.js";

const router = Router();

// Now each file has its own "department"
router.use("/health", healthRouter);
router.use("/guild", guildsRouter);
router.use("/members", membersRouter);

export default router;