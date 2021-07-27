"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = require("../controllers/recipe");
const joiSchemaValidation_1 = require("../middleware/joiSchemaValidation");
const router = express_1.Router();
router.get('/:id', joiSchemaValidation_1.validateGetRequestBody, recipe_1.getRecipe);
router.post('/', joiSchemaValidation_1.validatePostRequestBody, recipe_1.createRecipe);
router.patch('/:id', joiSchemaValidation_1.validatePatchRequestBody, recipe_1.patchRecipe);
router.get('/', recipe_1.getRecipes);
router.delete('/:id', recipe_1.deleteRecipe);
exports.default = router;
