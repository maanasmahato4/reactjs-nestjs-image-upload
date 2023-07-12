import { Controller, Get, Post, Body, Res, Param, ParseIntPipe, UploadedFile, Delete, UseInterceptors, UseGuards, UploadedFiles } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Express, Response } from 'express';
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { JwTAuthGuard } from 'src/common/authguard/jwt-auth.guard';

@Controller('gallery')
export class GalleryController {
    constructor(
        private galleryService: GalleryService
    ) { }

    @UseGuards(JwTAuthGuard)
    @Get('/:userId')
    async GetPhotos(@Param('userId', ParseIntPipe) userId: number, @Res() res: Response) {
        return await this.galleryService.getPhoto(userId, res);
    }

    @UseGuards(JwTAuthGuard)
    @Post('/d')
    async AddPhotoD(@Body() data: { title: string, userId: number }) {
        await this.galleryService.addPhotod(data);
        return { message: "success" };
    }

    @UseGuards(JwTAuthGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`);
            }
        })
    }))
    async AddPhoto(@Body() data: { title: string, userId: number }, @UploadedFile() photo: Express.Multer.File) {
        await this.galleryService.addPhoto(data, photo);
        return { message: "success" };
    }

    @UseGuards(JwTAuthGuard)
    @Post('/uploads')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))
    async Addphotos(@Body() data: { title: string, userId: number }, @UploadedFiles() photos: Array<Express.Multer.File>, @Res() res: Response) {
        await this.galleryService.addPhotos(data, photos);
        return res.json({message: "success"});
    }

    @UseGuards(JwTAuthGuard)
    @Delete('/:id')
    async DeletePhoto(id: number) {
        return await this.galleryService.deletePhoto(id);
    }
}
