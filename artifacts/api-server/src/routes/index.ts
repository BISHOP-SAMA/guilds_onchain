import { Router } from "express";
import healthRouter from "./health.js";
import guildRouter from "./guild.js";
import membersRouter from "./members.js";

const router = Router();

// Now each file has its own "department"
router.use("/health", healthRouter);
router.use("/guild", guildRouter);
router.use("/members", membersRouter);

export default router;