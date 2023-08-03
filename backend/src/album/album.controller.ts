import { Controller, Get, Body, Post, Delete, Param, UseGuards, ParseIntPipe } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { JwTAuthGuard } from "src/common/authguard/jwt-auth.guard";


@Controller('album')

export class AlbumController {
    constructor(
        private albumService: AlbumService
    ){}
    @UseGuards(JwTAuthGuard)
    @Get('/:userId')
    async GetAlbums(@Param('userId', ParseIntPipe) userId: number) {
        return await this.albumService.getAlbums(userId);
    }

    @UseGuards(JwTAuthGuard)
    @Post('/')
    async PostAlbums(@Body() album: any){
        return await this.albumService.addAlbum(album);
    }

    @UseGuards(JwTAuthGuard)
    @Delete()
    async DeleteAlbum(@Param('id') id: number){
        return await this.albumService.deleteAlbum(id);
    }
}