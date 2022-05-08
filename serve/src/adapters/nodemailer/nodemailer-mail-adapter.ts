import nodemailer from "nodemailer"

import { MailAdapter, ISendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "72ed659b793683",
      pass: "0462ad85744e8a"
    }
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: ISendMailData) {
        await transport.sendMail({
            from: "Equipe da feedback <no@feedback.com>",
            to: "Leonardo <leonardolp@gmail.com>",
            subject,
            html: body,
        })
    };

}