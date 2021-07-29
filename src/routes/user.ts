/* Copyright (c) 2021 Rishika Maroo */

import { Router } from 'express';
import { getUser, patchUser, signup } from '../controllers/user';
import {
  validateUserPatchRequestBody,
  validateUserPostRequestBody,
} from '../middleware/joiSchemaValidation';
import { validateToken } from '../middleware/tokenValidation';

const router = Router();

router.post('/', validateUserPostRequestBody, signup);
router.get('/:id', validateToken, getUser);
router.patch('/:id', validateUserPatchRequestBody, patchUser);

export default router;
