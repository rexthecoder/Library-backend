import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { BookEntity } from './BookEntity'; 
import { StudentEntity } from './StudentEntity';

@Entity({ name: 'borroweds' })
export class BorrowedEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    borrowedDate: string;

    @Column()
    borrowedDue: string;

    @ManyToOne(() => BookEntity, { eager: true })
    @JoinColumn({ name: 'bookId' })
    book: BookEntity;

    @ManyToOne(() => StudentEntity, { eager: true })
    @JoinColumn({ name: 'studentId' })
    student: StudentEntity;
}
