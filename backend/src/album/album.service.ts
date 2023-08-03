import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "src/common/entity/album.entity";
import { Repository } from "typeorm";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumRepo: Repository<Album>
    ) { }
    async getAlbums(userId: number) {
        return await this.albumRepo.find({where: {user_id: userId}});
    }
    async addAlbum(album: any) {
        return await this.albumRepo.save({user_id: album.user_id, album_name: album.album_name});
    }
    async deleteAlbum(id: number){
        return await this.albumRepo.delete(id);
    }
}