import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as session from "express-session";
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.use(session({
    secret: 'session_secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 360000
    }
  }));
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, "../uploads"),{
    prefix: '/gallery'
  });
  await app.listen(3000);
}
bootstrap();
