import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  year: integer("year").notNull(),
  number: integer("number").notNull(),
})

export type Player = typeof players.$inferSelect
