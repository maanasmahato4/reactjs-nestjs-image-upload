import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "src/common/entity/user.entity";
import { UserDto } from "src/common/dto/user/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}
    async createUser(UserData: UserDto){
        return await this.userRepo.save(UserData);
    }

    async findByEmail(userEmail: string){
        return await this.userRepo.findOne({where: {email: userEmail}});
    }
}