import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Photo } from 'src/common/entity/gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
