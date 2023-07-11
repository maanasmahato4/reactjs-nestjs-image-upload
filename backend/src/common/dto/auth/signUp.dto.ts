import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    @IsNotEmpty()
    @ApiProperty({ type: String })
    username: string;

    @IsEmail()
    @ApiProperty({ type: String })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ type: String })
    password: string;
}

