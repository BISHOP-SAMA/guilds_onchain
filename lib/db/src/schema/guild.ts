import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const guildsTable = pgTable("guilds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  collectionAddress: text("collection_address").notNull().unique(),
  collectionName: text("collection_name"),
  ownerWallet: text("owner_wallet").notNull(),
  memberCount: integer("member_count").notNull().default(0),
  strength: integer("strength").notNull().default(0),
  rank: integer("rank").notNull().default(0),
  weeklyPoints: integer("weekly_points").notNull().default(0),
  website: text("website"),
  twitter: text("twitter"),
  discord: text("discord"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGuildSchema = createInsertSchema(guildsTable).omit({ id: true, memberCount: true, strength: true, rank: true, weeklyPoints: true, createdAt: true });
export type InsertGuild = z.infer<typeof insertGuildSchema>;
export type Guild = typeof guildsTable.$inferSelect;
