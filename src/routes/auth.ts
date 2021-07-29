/* Copyright (c) 2021 Rishika Maroo */

import { Router } from 'express';
import { login } from '../controllers/user';
import { validateUserLoginRequestBody } from '../middleware/joiSchemaValidation';

const router = Router();

router.post('/', validateUserLoginRequestBody, login);

export default router;
