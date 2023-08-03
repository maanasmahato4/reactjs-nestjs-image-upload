import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    album_name: string
}