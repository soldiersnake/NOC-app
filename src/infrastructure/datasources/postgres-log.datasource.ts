import { LogDatasource } from "../../domian/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domian/entities/log.entity";
import { SeverityLevel, PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { envs } from "../../config/plugins/envs.plugin";

const connectionString = envs.POSTGRES_URL.replace(/^"+|"+$/g, "");
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const primaClient = new PrismaClient({ adapter });

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}


export class PostgresLogDatasource implements LogDatasource{

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]

        const newLog = await primaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        })
        console.log('Posgres saved...');
        
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];
        
        const dbLogs = await primaClient.logModel.findMany({
            where: {level}
        });

        return dbLogs.map( LogEntity.fromObject );
    }
    
}
