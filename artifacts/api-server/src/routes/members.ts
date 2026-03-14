import { Router, type IRouter } from "express";
import { db, membersTable, guildsTable } from "@workspace/db";
import { RegisterMemberBody } from "@workspace/api-zod";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/members", async (req, res) => {
  try {
    const body = RegisterMemberBody.parse(req.body);

    const existing = await db.select().from(membersTable).where(eq(membersTable.walletAddress, body.walletAddress));
    if (existing.length > 0) {
      res.status(409).json({ error: "Wallet already registered" });
      return;
    }

    const [member] = await db.insert(membersTable).values({
      walletAddress: body.walletAddress,
      discordHandle: body.discordHandle ?? null,
      twitterHandle: body.twitterHandle ?? null,
      referralCode: body.referralCode ?? null,
    }).returning();

    res.status(201).json({
      id: member.id,
      walletAddress: member.walletAddress,
      discordHandle: member.discordHandle,
      twitterHandle: member.twitterHandle,
      guildId: member.guildId,
      role: member.role,
      points: member.points,
      createdAt: member.createdAt.toISOString(),
    });
  } catch (err: any) {
    if (err?.code === "23505") {
      res.status(409).json({ error: "Wallet already registered" });
      return;
    }
    res.status(400).json({ error: "Invalid request data" });
  }
});

export default router;
