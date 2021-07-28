"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = require("../controllers/recipe");
const router = express_1.Router();
router.get('/:id', recipe_1.getRecipe);
router.post('/', recipe_1.createRecipe);
router.patch('/:id', recipe_1.patchRecipe);
router.delete('/:id', recipe_1.deleteRecipe);
exports.default = router;
