import { SendEmailLogs } from "../domian/use-cases/email/send-email-logs";
import { FileSystemDatasources } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasources(),
);
const emailService = new EmailService();

export class Server {
    public static start() {

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

        // generacion de emails

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is Ok`),
        //             (error) => console.log(error),
        //             // undefined,
        //             // undefined,
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     });
    }
}
