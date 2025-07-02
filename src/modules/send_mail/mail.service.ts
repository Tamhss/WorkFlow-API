import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()

export class MailService {
    private transport = nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: Number(process.env.PORT_MAIL),
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.PASSWORD,
        },
    })
    async sendMailAccount(to: string, randomPassword: string) {
        await this.transport.sendMail ({
            from: "WorkFlow App",
            to,
            subject: 'Tài khoản của bạn đã được tạo thành công',
            html: `
                <h1>Chào mừng bạn đến với WorkFlow</h1>
                <p>Tài khoản của bạn đã được tạo thành công, dưới đây là thông tin đăng nhập: </p>
                <ul>
                    <li>Email: ${to}</li>
                    <li>Mật khẩu: ${randomPassword}</li>
                </ul>
                <p>Vui lòng đăng nhập và thay đổi mật khẩu của bạn.</p>
            `,
        });
    }

}