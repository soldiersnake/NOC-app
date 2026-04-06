import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

(async () => {
    main();
})();

async function main() {
  MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const connectionString = envs.POSTGRES_URL.replace(/^"+|"+$/g, "");
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // const newLog = await prisma.logModel.create({
    //   data: {
    //     level: "HIGH",
    //     message: "Test Message",
    //     origin: "App.ts",
    //   },
    // });
    // console.log(newLog);
    const logs = await prisma.logModel.findMany();
    console.log(logs);
    

  } catch (error) {
    console.error("Error al insertar log en Postgres:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }

  // Server.start();
}
