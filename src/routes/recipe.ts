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
  validateRecipePatchRequestBody,
  validateRecipePostRequestBody,
} from '../middleware/joiSchemaValidation';

const router = Router();

router.get('/:id', getRecipe);
router.post('/', validateRecipePostRequestBody, createRecipe);
router.patch('/:id', validateRecipePatchRequestBody, patchRecipe);
router.get('/', getRecipes);
router.delete('/:id', deleteRecipe);

export default router;
