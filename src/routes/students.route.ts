import { Router } from 'express'
import studentsController from '../controllers/students.controller';



const router = Router();


router.route('/')
    .get(studentsController.getStudents)
    .post(studentsController.createStudent);


router.route('/:id')
    .get(studentsController.getStudentById)
    .put(studentsController.updateStudent)
    .delete(studentsController.deleteStudent);

export default router;