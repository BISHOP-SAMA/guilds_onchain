import { pgTable, text, serial, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { guildsTable } from "./guilds";

export const memberRoleEnum = pgEnum("member_role", ["citizen", "military", "president"]);

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  discordHandle: text("discord_handle"),
  twitterHandle: text("twitter_handle"),
  guildId: integer("guild_id").references(() => guildsTable.id),
  role: memberRoleEnum("role").notNull().default("citizen"),
  points: integer("points").notNull().default(0),
  referralCode: text("referral_code"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMemberSchema = createInsertSchema(membersTable).omit({ id: true, guildId: true, role: true, points: true, createdAt: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof membersTable.$inferSelect;
