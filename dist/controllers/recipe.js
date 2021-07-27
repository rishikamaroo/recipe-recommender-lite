"use strict";
/* Copyright (c) 2021 Rishika Maroo */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipes = exports.deleteRecipe = exports.patchRecipe = exports.getRecipe = exports.createRecipe = void 0;
const uuid_1 = require("uuid");
const recipe_1 = require("../models/recipe");
const response_1 = require("../utils/response");
/**
 * createRecipe is a request handler to create a recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const createRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.body.text;
        const result = yield recipe_1.createRecipeP(uuid_1.v4().toString(), text);
        response_1.generateCreateSuccessResponse(res, result);
    }
    catch (err) {
        response_1.generateInternalServerErrorResponse(res, err);
    }
});
exports.createRecipe = createRecipe;
/**
 * getRecipe is a request handler to get a given recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const getRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield recipe_1.getRecipeP(id);
        response_1.generateSuccessResponse(res, result);
    }
    catch (err) {
        response_1.generateNotFoundErrorResponse(res, err);
    }
});
exports.getRecipe = getRecipe;
/**
 * patchRecipe is a request handler  to update a recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const patchRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const text = req.body.text;
        const result = yield recipe_1.patchRecipeP(id, text);
        response_1.generateSuccessResponse(res, result);
    }
    catch (err) {
        response_1.generateNotFoundErrorResponse(res, err);
    }
});
exports.patchRecipe = patchRecipe;
/**
 * deleteRecipe is a request handler to delete a recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const deleteRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield recipe_1.deleteRecipeP(id);
        response_1.generateSuccessResponse(res);
    }
    catch (err) {
        response_1.generateNotFoundErrorResponse(res, err);
    }
});
exports.deleteRecipe = deleteRecipe;
/**
 * getRecipes is a request handler to get all the recipies
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const getRecipes = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_1.getRecipesP();
        response_1.generateSuccessResponse(res, result);
    }
    catch (err) {
        response_1.generateInternalServerErrorResponse(res, err);
    }
});
exports.getRecipes = getRecipes;
