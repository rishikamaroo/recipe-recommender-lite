/* Copyright (c) 2021 Rishika Maroo */

import { Router } from 'express';
import {
  createRecipe,
  getRecipe,
  patchRecipe,
  deleteRecipe,
  getRecipes,
} from '../controllers/recipe';
import {
  validateGetRequestBody,
  validatePatchRequestBody,
  validatePostRequestBody,
} from '../middleware/joiSchemaValidation';

const router = Router();

router.get('/:id', validateGetRequestBody, getRecipe);
router.post('/', validatePostRequestBody, createRecipe);
router.patch('/:id', validatePatchRequestBody, patchRecipe);
router.get('/', getRecipes);
router.delete('/:id', deleteRecipe);

export default router;
