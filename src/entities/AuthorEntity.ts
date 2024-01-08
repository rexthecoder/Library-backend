
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'authors'})
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    authorId: number;

    @Column({ nullable: false })
    firstName: string;


    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    country: string;

    @Column({nullable: true})
    biography: string;

}
