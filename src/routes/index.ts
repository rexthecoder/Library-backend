import { Router } from 'express';

import users from './users.route';
import books from './books.route';
import authors from './authors.route';

const router = Router();

router.use('/users', users);
router.use('/books', books)
router.use('/authors', authors)


export default router;
