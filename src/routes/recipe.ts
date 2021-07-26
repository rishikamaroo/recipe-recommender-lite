/* Copyright (c) 2021 Rishika Maroo */

import { Router } from 'express';
import { createRecipe, getRecipe, patchRecipe, deleteRecipe } from '../controllers/recipe';

const router = Router();

router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.patch('/:id', patchRecipe);
router.delete('/:id', deleteRecipe);

export default router;
