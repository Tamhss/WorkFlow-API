import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    @Post()
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);
    }
}