
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'authors'})
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    authorId: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    country: string;

    @Column({nullable: true})
    biography: string;

}
