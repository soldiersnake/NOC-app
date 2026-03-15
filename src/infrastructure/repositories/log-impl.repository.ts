import { LogDatasource } from "../../domian/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domian/entities/log.entity";
import { LogRepository } from "../../domian/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDatasources: LogDatasource,
    ) {

    }

    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasources.saveLog(log)
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasources.getLogs(severityLevel)
    }

}