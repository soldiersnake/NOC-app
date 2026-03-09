import fs from 'fs';
import { LogDatasource } from "../../domian/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domian/entities/log.entity";



export class FileSystemDatasources implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '')
        })
    }


    async saveLog(newlog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newlog)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);
        if (newlog.level === LogSeverityLevel.low) return;
        if (newlog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }

    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error('Method not implemented.')
    }

}