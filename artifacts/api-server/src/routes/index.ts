import { Router, type IRouter } from "express";
import healthRouter from "./health";
import guildsRouter from "./guilds";
import membersRouter from "./members";

const router: IRouter = Router();

router.use(healthRouter);
router.use(guildsRouter);
router.use(membersRouter);

export default router;
