import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import  {BorrowedEntity}  from './BorrowedEntity'; // Adjust the import path

@Entity({ name: 'students' })
export class StudentEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => BorrowedEntity, (borrowed) => borrowed.student)
  borrowedBooks: BorrowedEntity[];
}