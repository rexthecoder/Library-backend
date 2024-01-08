import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './BookEntity'; // Adjust the import path

@Entity({ name: 'publishers' })
export class PublisherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  publisherName: string;

  @Column()
  address: string;

  @OneToMany(() => BookEntity, (book) => book.publisher)
  books: BookEntity[];

  // Add the following if you want to enforce a one-to-one relationship with BookEntity
  
}