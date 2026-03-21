import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domian/entities/log.entity';

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments: Attachements[]
};

interface Attachements {
    filename: string;
    path: string;
}


export class EmailService {

    constructor() {

    }

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
                attachments: attachments,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs Servidor';
        const htmlBody = `
                <h3>test / probando enviar mail</h3>
                <p> probando envio de mails </p>
                <p> verlos los logs adjuntos </p>
            `;
        const attachments: Attachements[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }

}
