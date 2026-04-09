import { LogSeverityLevel } from "../domian/entities/log.entity";
import { CheckService } from "../domian/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domian/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domian/use-cases/email/send-email-logs";
import { FileSystemDatasources } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// const LogRepository = new LogRepositoryImpl(
//     // new FileSystemDatasources(),
//     // new MongoLogDatasource(),
//     new PostgresLogDatasource(),
// );

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasources(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
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

        // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);
        

        // CUANDO ES BASE DE DATOS INDIVIDUALES
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://gosssogle.com';
        //         new CheckService(
        //             LogRepository,
        //             () => console.log(`${url} is Ok`),
        //             (error) => console.log(error),
        //             // undefined,
        //             // undefined,
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     });

        // CUANDO SON BASE DE DATOS MULTIPLES
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is Ok`),
                    (error) => console.log(error),
                    // undefined,
                    // undefined,
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            });
    }
}
