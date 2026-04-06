import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7: datasource URL must live in prisma.config.ts, not in schema.prisma
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: env("POSTGRES_URL"),
  },
});
