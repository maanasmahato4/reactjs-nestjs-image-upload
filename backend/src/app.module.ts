import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/entity/user.entity';
import { Photo } from './common/entity/gallery.entity';
import { Album } from './common/entity/album.entity';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, AuthModule, GalleryModule, AlbumModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gallery',
      entities: [User, Photo, Album],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
