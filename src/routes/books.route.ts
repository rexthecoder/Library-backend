import { Router } from 'express'

import BooksController from '../controllers/books.controller';

const router = Router();


router.route('/')
    .get(BooksController.getAllBooks)
    .post(BooksController.createBook);


router.route('/:id')
    .get(BooksController.getBookById)
    .put(BooksController.updateBook)
    .delete(BooksController.deleteBook);

export default router;