import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/core/global/prisma/prisma.service";
import { MailService } from "../send_mail/mail.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, MailService],
})
export class UserModule {}