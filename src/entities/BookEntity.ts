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
    authorId: number;


    @OneToOne(() => CategoryEntity)
    @JoinColumn()
    category: CategoryEntity;

    // @OneToOne(() => PublisherEntity)
    // @JoinColumn()
    // publisher: PublisherEntity;
    @ManyToOne(() => PublisherEntity, (publisher) => publisher.books)
    @JoinColumn({ name: 'publisherId' })
    publisher: PublisherEntity;
}