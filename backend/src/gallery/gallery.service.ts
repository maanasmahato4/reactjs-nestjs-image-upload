import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from 'src/common/entity/gallery.entity';
import { Response } from "express";
import * as path from 'path';
import * as fs from "fs";

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(Photo)
        private galleryRepo: Repository<Photo>
    ) { }

    async getPhoto(userId: number, res: Response) {
        const photos = await this.galleryRepo.find({ where: { userId: userId } })
        return res.json(photos);
    }

    async addPhoto(data: { title: string, userId: number }, photo: Express.Multer.File) {
        return await this.galleryRepo.save({ userId: data.userId, title: data.title, fileName: photo.originalname });
    }

    async addPhotos(data: { title: string, userId: number }, photos: Array<Express.Multer.File>) {
        const promises = photos.map(async (photo) => {
            return await this.galleryRepo.save({ userId: data.userId, title: data.title, fileName: photo.originalname });
        })
        return await Promise.all(promises);
    }

    async deletePhoto(id: number) {
        const data = await this.galleryRepo.findOne({ where: { id: id } });
        if (!data) {
            throw new Error("Image not found!")
        }
        const imagePath = path.join(__dirname, "../uploads" + data.fileName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        return await this.galleryRepo.delete(id)
    }
}
