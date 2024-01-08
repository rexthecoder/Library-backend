import { Router } from 'express';

import users from './users.route';
import books from './books.route';
import authors from './authors.route';
import publishers from './publishers.route';
import students from './students.route';
import borroweds from './borroweds.route';

const router = Router();

router.use('/users', users);
router.use('/books', books)
router.use('/authors', authors)
router.use('/publishers', publishers)
router.use('/students', students)
router.use('/borroweds', borroweds)


export default router;
