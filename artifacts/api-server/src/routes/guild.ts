import { Router, type IRouter } from "express";
import { db, guildsTable, membersTable } from "@workspace/db";
import { RegisterGuildBody, GetGuildParams } from "@workspace/api-zod";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/guilds", async (_req, res) => {
  try {
    const guilds = await db.select().from(guildsTable).orderBy(desc(guildsTable.strength));
    res.json(guilds.map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description,
      collectionAddress: g.collectionAddress,
      memberCount: g.memberCount,
      strength: g.strength,
      rank: g.rank,
      ownerWallet: g.ownerWallet,
      createdAt: g.createdAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

router.get("/guilds/:id", async (req, res) => {
  try {
    const { id } = GetGuildParams.parse({ id: Number(req.params.id) });
    const [guild] = await db.select().from(guildsTable).where(eq(guildsTable.id, id));
    if (!guild) {
      res.status(404).json({ error: "Guild not found" });
      return;
    }
    res.json({
      id: guild.id,
      name: guild.name,
      description: guild.description,
      collectionAddress: guild.collectionAddress,
      memberCount: guild.memberCount,
      strength: guild.strength,
      rank: guild.rank,
      ownerWallet: guild.ownerWallet,
      createdAt: guild.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
});

router.post("/guilds", async (req, res) => {
  try {
    const body = RegisterGuildBody.parse(req.body);
    const [guild] = await db.insert(guildsTable).values({
      name: body.name,
      description: body.description,
      collectionAddress: body.collectionAddress,
      collectionName: body.collectionName,
      ownerWallet: body.ownerWallet,
      website: body.website,
      twitter: body.twitter,
      discord: body.discord,
    }).returning();
    res.status(201).json({
      id: guild.id,
      name: guild.name,
      description: guild.description,
      collectionAddress: guild.collectionAddress,
      memberCount: guild.memberCount,
      strength: guild.strength,
      rank: guild.rank,
      ownerWallet: guild.ownerWallet,
      createdAt: guild.createdAt.toISOString(),
    });
  } catch (err: any) {
    if (err?.code === "23505") {
      res.status(409).json({ error: "A guild with this collection address already exists" });
      return;
    }
    res.status(400).json({ error: "Invalid request data" });
  }
});

router.get("/leaderboard", async (_req, res) => {
  try {
    const guilds = await db.select().from(guildsTable).orderBy(desc(guildsTable.strength));
    const leaderboard = guilds.map((g, idx) => ({
      rank: idx + 1,
      guildId: g.id,
      guildName: g.name,
      memberCount: g.memberCount,
      strength: g.strength,
      weeklyPoints: g.weeklyPoints,
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

export default router;
        
