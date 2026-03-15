import { Router } from "express";
import type { Request, Response } from "express";
import { HealthStatus } from "@workspace/api-zod";

const router = Router();

// Change "/healthz" to "/"
router.get("/", (_req: Request, res: Response) => {
  const data: HealthStatus = { status: "ok" };
  res.json(data);
});

export default router;
