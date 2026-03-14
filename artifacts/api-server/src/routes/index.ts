import { Router } from "express";
import healthRouter from "./health.js";
import guildsRouter from "./guilds.js";
import membersRouter from "./members.js";

const router = Router();

router.use(healthRouter);
router.use(guildsRouter);
router.use(membersRouter);

export default router;