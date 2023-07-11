import {Controller, Post, Body} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "src/common/dto/user/user.dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Post('/create')
    async CreateUser(@Body() userCreds: UserDto){
        return await this.userService.createUser(userCreds);
    }

    @Post("/find")
    async FindByEmail(@Body() userEmail: string): Promise<UserDto>{
        return await this.userService.findByEmail(userEmail);
    }
}