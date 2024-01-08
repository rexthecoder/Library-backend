import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { AuthorEntity } from "./AuthorEntity";
import { CategoryEntity } from "./CategoryEntity";
import { PublisherEntity } from "./PublisherEntity";

@Entity({ name: 'books' })
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    bookId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToOne(() => AuthorEntity)
    @JoinColumn({ name: 'authorId' })
    authorId: string;


    @OneToOne(() => CategoryEntity)
    @JoinColumn()
    category: CategoryEntity;

    @OneToOne(() => PublisherEntity)
    @JoinColumn()
    publisher: PublisherEntity;

}