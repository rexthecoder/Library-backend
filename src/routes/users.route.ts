import { Router } from 'express';

import { createUser, getUsers, loginUser } from '../controllers/users.controller';
import { getCurrentUser, login, register } from '../controllers/auth.controller';
import { loginRules} from '../middleware/validation';
import validator from '../middleware/validator';
import isAuthenticated from '../middleware/isAuthenticated';
const router = Router();

router.get('/', getUsers);
// login router
router.post('/login', validator(loginRules),  login);
router.post('/create', register);

router.route('/me').get(isAuthenticated, getCurrentUser)

export default router;
