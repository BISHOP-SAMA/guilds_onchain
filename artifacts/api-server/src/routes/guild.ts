import { Router } from "express";
import { db, guildsTable } from "@workspace/db";
import { RegisterGuildBody, GetGuildParams } from "@workspace/api-zod";
import { eq, desc } from "drizzle-orm";

const router = Router();

// GET /api/guild - Fetch all guilds ordered by strength
router.get("/", async (_req, res) => {
  try {
    const guilds = await db.select().from(guildsTable).orderBy(desc(guildsTable.strength));
    res.json(guilds.map((g) => ({
      ...g,
      createdAt: g.createdAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

// GET /api/guild/leaderboard - Specific ranked view
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

// GET /api/guild/:id - Fetch a specific guild by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = GetGuildParams.parse({ id: Number(req.params.id) });
    const [guild] = await db.select().from(guildsTable).where(eq(guildsTable.id, id));
    
    if (!guild) {
      res.status(404).json({ error: "Guild not found" });
      return;
    }
    
    res.json({
      ...guild,
      createdAt: guild.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
});

// POST /api/guild - Create a new guild
router.post("/", async (req, res) => {
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
      ...guild,
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

export default router;
