import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from '../common/strategy/localStrategy';
import { Jwtstrategy } from 'src/common/strategy/jwtStratey';

@Module({
  imports: [UserModule, JwtModule.register({ secret: "jwt_secret", signOptions: { expiresIn: '1d' } }), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, Jwtstrategy]
})
export class AuthModule { }
