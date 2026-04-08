import mongoose from "mongoose";
import { MongoDatabase, LogModel } from "../../data/mongo";
import { envs } from "../../config/plugins/envs.plugin";
import { LogDatasource } from "../../domian/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domian/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
    private async ensureConnected() {
        // 1 = connected, 2 = connecting
        if (mongoose.connection.readyState === 1) return;
        if (mongoose.connection.readyState === 2) {
            await mongoose.connection.asPromise();
            return;
        }

        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        });
    }

    async saveLog(log: LogEntity): Promise<void> {
        await this.ensureConnected();
        const newLog = await LogModel.create(log);
        console.log('Mongo log created: ', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        await this.ensureConnected();
        const logs = await LogModel.find({
            level: severityLevel
        })
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
}
