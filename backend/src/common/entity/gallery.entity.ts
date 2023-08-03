import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    album: string

    @Column()
    fileName: string
}