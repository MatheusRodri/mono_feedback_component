import { MailAdapater, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d0ae55b021aac9",
        pass: "1d97169a1851c6"
    }
});

export class NodemailerMailAdapter implements MailAdapater {
    async sendMail({subject,body}: SendMailData) {
        await transport.sendMail({
            from:'Equipe Feeget <oi@feeget.com>',
            to:"Matheus Rodrigues <matheus.rj25@hotmail.com>",
            subject,
            html:body,
        })
    }
}