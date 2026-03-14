import { Router } from "express";
import { HealthStatus } from "@workspace/api-zod";

const router = Router();

router.get("/healthz", (_req: any, res: any) => {
  const data: HealthStatus = { status: "ok" };
  res.json(data);
});

export default router;