import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/global/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { ESystemRoleId } from "src/core/constant";
import { MailService } from "../send_mail/mail.service";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) { }
    async createUser(body: CreateUserDto) {
        if (!body.name || !body.nickName || !body.email) {
            throw new Error("All fields are required");
        }
        const user = await this.prisma.user.findUnique({
            where: { nickName: body.nickName, email: body.email },
        });

        if (user) {
            throw new Error("User already exists with this nickname or email");
        }

        const roleId = ESystemRoleId.get(body.roles);

        if (typeof roleId !== "number") {
            throw new Error("Invalid role ID");
        }
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const createUser = await this.prisma.user.create({
            data: {
                name: body.name,
                nickName: body.nickName,
                email: body.email,
                roles: {
                    create: { 
                        roleId: roleId
                    }
                },
                user_auth: {
                    create: {
                        password: hashedPassword,
                    },
                },
            }
        })

        await this.mailService.sendMailAccount(body.email, randomPassword)
        return createUser;
    }
}
