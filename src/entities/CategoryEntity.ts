import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookEntity } from './BookEntity'; // Adjust the import path

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  categoryName: string;

  @OneToMany(() => BookEntity, (book) => book.category)
  books: BookEntity[];
}