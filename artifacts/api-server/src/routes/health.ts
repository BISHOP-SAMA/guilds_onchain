import { Router } from "express";
import type { Request, Response } from "express";
import { HealthStatus } from "@workspace/api-zod";

const router = Router();

router.get("/healthz", (_req: Request, res: Response) => {
  const data: HealthStatus = { status: "ok" };
  res.json(data);
});

export default router;