import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import { Request } from "express";


@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            ignoreExpiration: false,
            secretOrKey: 'jwt_secret',
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    const data = req?.cookies['access_token']
                    if(!data){
                        return null;
                    }
                    return data;
                }
            ])
        })
    }
    async validate(payload: any): Promise<object>{
        if(payload == null){
            throw new UnauthorizedException();
        }
        return {id: payload.id, email: payload.email, username: payload.username}
    }
}