import { Router } from 'express'


import authorController from '../controllers/authors.controller';

const router = Router();


router.route('/')
    .get(authorController.getAllAuthors)
    .post(authorController.createAuthor);


router.route('/:id')
    .get(authorController.getAuthorById)
    .put(authorController.updateAuthor)
    .delete(authorController.deleteAuthor);

export default router;