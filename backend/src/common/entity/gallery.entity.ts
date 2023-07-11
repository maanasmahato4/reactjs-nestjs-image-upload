import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column({default: ''})
    title: string

    @Column()
    fileName: string
}