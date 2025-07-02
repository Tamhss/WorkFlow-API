
import { IsEnum, IsString } from "class-validator";
import { ESystemRole } from "src/core/enum/default.enum";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    nickName: string;

    @IsString()
    email: string;

    @IsEnum(ESystemRole)
    roles: ESystemRole;
}