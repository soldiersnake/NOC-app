import { LogSeverityLevel } from "../domian/entities/log.entity";
import { CheckService } from "../domian/use-cases/checks/check-service";
import { SendEmailLogs } from "../domian/use-cases/email/send-email-logs";
import { FileSystemDatasources } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const LogRepository = new LogRepositoryImpl(
    // new FileSystemDatasources(),
    new MongoLogDatasource(),
);
const emailService = new EmailService();

export class Server {
    public static async start() {

        console.log('Server started...');

        // DESCOMENTAR PARA QUE FUNCIONE EL ENVIO DE MAILS
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['demiansnake5@gmail.com', 'mariano.maciasgandulfo@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs([
        //     'demiansnake5@gmail.com', 'mariano.maciasgandulfo@gmail.com'
        // ]);

        const logs = await LogRepository.getLogs(LogSeverityLevel.low);
        console.log(logs);
        

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://gooasdgle.com';
        //         new CheckService(
        //             LogRepository,
        //             () => console.log(`${url} is Ok`),
        //             (error) => console.log(error),
        //             // undefined,
        //             // undefined,
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     });
    }
}
