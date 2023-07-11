import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../../auth/auth.service";
import { User } from "src/common/entity/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService
    ){
        super({usernameField: 'email'})
    }

    async validate(email: string, password: string ): Promise<User>{
        const signInData = {
            email,
            password
        }
        const creds = await this.authService.validateUser(signInData);
        if(!creds){
            throw new UnauthorizedException('invalid credentials')
        }
        return creds;
    } 
}