import { Router } from 'express';

import { createUser, getUsers, loginUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);
// login router
router.post('/login', loginUser);
router.post('/create', createUser);

export default router;
