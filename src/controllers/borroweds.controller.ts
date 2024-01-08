import { Request, Response } from 'express';
import handleGetRepository from '../utils/handleGetRepository';
import { BorrowedEntity } from '../entities/BorrowedEntity';
import { BookEntity } from '../entities/BookEntity';
import { StudentEntity } from '../entities/StudentEntity';


const bookRepository = handleGetRepository(BookEntity);
const studentRepository = handleGetRepository(StudentEntity);

class BorrowedController {
    private borrowedRepository = handleGetRepository(BorrowedEntity);

    getBorrowedRecords = async (req: Request, res: Response): Promise<void> => {
        try {
            const borrowedRecords = await this.borrowedRepository.find({ relations: ['book', 'student'] });
            res.status(200).json(borrowedRecords);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getBorrowedRecordById = async (req: Request, res: Response): Promise<void> => {
        const borrowedId = req.params.id;

        try {
            const borrowedRecord = await this.borrowedRepository.findOneBy({ id: Number(borrowedId), });

            if (!borrowedRecord) {
                res.status(404).json({ message: 'Borrowed record not found' });
                return;
            }

            res.status(200).json(borrowedRecord);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    createBorrowedRecord = async (req: Request, res: Response): Promise<void> => {
        const { borrowedDate, borrowedDue, bookId, studentId } = req.body;

        try {


            // Check if the specified book exists
            const book = await bookRepository.findOne(bookId);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
            }

            // Check if the specified student exists
            const student = await studentRepository.findOne(studentId);
            if (!student) {
                res.status(404).json({ message: 'Student not found' });
            }

            const borrowedRecord = this.borrowedRepository.create({
                borrowedDate,
                borrowedDue,
                book,
                student,
            });

            const result = await this.borrowedRepository.save(borrowedRecord);

            res.status(201).json({
                message: 'Borrowed record created',
                data: {
                    id: result.id,
                    borrowedDate: result.borrowedDate,
                    borrowedDue: result.borrowedDue,
                    book: result.book,
                    student: result.student,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }



    };

    updateBorrowedRecord = async (req: Request, res: Response): Promise<void> => {
        const borrowedId = req.params.id;
        const { borrowedDate, borrowedDue, bookId, studentId } = req.body;

        try {
            const book = await bookRepository.findOne(bookId);
            const student = await studentRepository.findOne(studentId);

            if (!book || !student) {
                res.status(404).json({ message: 'Book or student not found' });
            }

            const borrowedRecord = await this.borrowedRepository.findOneBy({ id: Number(borrowedId), });

            if (!borrowedRecord) {
                res.status(404).json({ message: 'Borrowed record not found' });
            }

            this.borrowedRepository.merge(borrowedRecord, {
                borrowedDate,
                borrowedDue,
                book,
                student,
            });

            const result = await this.borrowedRepository.save(borrowedRecord);

            res.status(200).json({
                message: 'Borrowed record updated',
                data: {
                    id: result.id,
                    borrowedDate: result.borrowedDate,
                    borrowedDue: result.borrowedDue,
                    book: result.book,
                    student: result.student,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteBorrowedRecord = async (req: Request, res: Response): Promise<void> => {
        const borrowedId = req.params.id;

        try {
            const result = await this.borrowedRepository.delete(borrowedId);

            if (result.affected === 0) {
                res.status(404).json({ message: 'Borrowed record not found' });
                return;
            }

            res.status(200).json({ message: 'Borrowed record deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default new BorrowedController();