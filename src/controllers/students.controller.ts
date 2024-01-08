import { Request, Response } from 'express';
import handleGetRepository from '../utils/handleGetRepository';
import { StudentEntity } from '../entities/StudentEntity';


class StudentController {
    private studentRepository = handleGetRepository(StudentEntity);

    getStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            const students = await this.studentRepository.find({ relations: ['borrowedBooks'] });
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getStudentById = async (req: Request, res: Response): Promise<void> => {
        const studentId = req.params.id;

        try {
            const student = await this.studentRepository.findOneBy({ id: Number(studentId) });

            if (!student) {
                res.status(404).json({ message: 'Student not found' });
                return;
            }

            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createStudent = async (req: Request, res: Response): Promise<void> => {
        const { id, firstName, lastName } = req.body;

        try {
            const student = this.studentRepository.create({
                id,
                firstName,
                lastName,
            });

            const result = await this.studentRepository.save(student);

            res.status(201).json({
                message: 'Student created',
                data: {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateStudent = async (req: Request, res: Response): Promise<void> => {
        const studentId = req.params.id;
        const { firstName, lastName } = req.body;

        try {
            const student = await this.studentRepository.findOneBy({ id: Number(studentId) });

            if (!student) {
                res.status(404).json({ message: 'Student not found' });
                return;
            }

            this.studentRepository.merge(student, {
                firstName,
                lastName,
            });

            const result = await this.studentRepository.save(student);

            res.status(200).json({
                message: 'Student updated',
                data: {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteStudent = async (req: Request, res: Response): Promise<void> => {
        const studentId = req.params.id;

        try {
            const result = await this.studentRepository.delete(studentId);

            if (result.affected === 0) {
                res.status(404).json({ message: 'Student not found' });
                return;
            }

            res.status(200).json({ message: 'Student deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default new StudentController();