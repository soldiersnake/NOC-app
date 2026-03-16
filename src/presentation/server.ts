import { CheckService } from "../domian/use-cases/checks/check-service";
import { FileSystemDatasources } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasources(),
);

export class Server {
    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://localhost:3000';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is Ok`),
                    (error) => console.log(error),
                    // undefined,
                    // undefined,
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            });
    }
}