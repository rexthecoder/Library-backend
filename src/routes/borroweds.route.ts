import { Router } from 'express'
import borrowedsController from '../controllers/borroweds.controller';


const router = Router();


router.route('/')
    .get(borrowedsController.getBorrowedRecords)
    .post(borrowedsController.createBorrowedRecord);


router.route('/:id')
    .get(borrowedsController.getBorrowedRecordById)
    .put(borrowedsController.updateBorrowedRecord)
    .delete(borrowedsController.deleteBorrowedRecord);

export default router;