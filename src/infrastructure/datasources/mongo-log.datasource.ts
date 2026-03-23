import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domian/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domian/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo log created: ', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
}