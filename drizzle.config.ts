import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: "expo",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DB_FILE_NAME!,
    },
} satisfies Config;