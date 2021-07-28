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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRecipeP = exports.getRecipeP = exports.deleteRecipeP = exports.createRecipeP = exports.Recipe = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const error_1 = require("../utils/error");
const RecipeSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
});
const Recipe = mongoose_1.default.model('Recipe', RecipeSchema);
exports.Recipe = Recipe;
const logger = new logger_1.Logger();
/**
 * Creates a recipe
 *
 * @param id - recipe id
 * @param text - recipe text
 * @returns Promise<IRecipe>
 */
function createRecipeP(id, text) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('creating a recipe for id: ', id);
        try {
            const result = yield Recipe.create({ id: id, text: text });
            return result;
        }
        catch (err) {
            logger.error('error while creating a recipe ', err);
            throw new error_1.InvalidRequestError(err.message);
        }
    });
}
exports.createRecipeP = createRecipeP;
/**
 * Gets recipe for given id
 *
 * @param id - recipe id
 * @returns Promise<IRecipe>
 */
function getRecipeP(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('getting a recipe for id: ', id);
        try {
            const result = yield Recipe.find({ id: id });
            if (result.length === 0) {
                throw new error_1.NotFoundError('no record found for id: ' + id);
            }
            return result;
        }
        catch (err) {
            logger.error('error while getting a recipe ', err);
            throw new error_1.CustomError(err.message, err.code);
        }
    });
}
exports.getRecipeP = getRecipeP;
/**
 * Patches recipe for given id
 *
 * @param id - recipe id
 * @param text - recipe text
 * @returns Promise<IRecipe>
 */
function patchRecipeP(id, text) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('patching text recipe for id & text: ', [id, text]);
        if (!text) {
            throw new error_1.InvalidRequestError('cannot update recipe with null text');
        }
        try {
            const updatedResult = yield Recipe.findOneAndUpdate({ id: id }, { $set: { text: text } }, { new: true });
            if (!updatedResult) {
                throw new error_1.NotFoundError('no record found for id: ' + id);
            }
            logger.debug('the result is updated ', updatedResult);
            return updatedResult;
        }
        catch (err) {
            logger.error('error while patching text to a Recipe ', err);
            throw new error_1.CustomError(err.message, err.code);
        }
    });
}
exports.patchRecipeP = patchRecipeP;
/**
 * Deletes recipe for given id
 *
 * @param id - recipe id
 * @returns Promise<void>
 */
function deleteRecipeP(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.warn('deleting a recipe for id: ', id);
        try {
            const updatedResult = yield Recipe.deleteOne({ id: id });
            if (updatedResult.deletedCount === 0) {
                throw new error_1.NotFoundError('the record you are trying to remove does not exist with id: ' + id);
            }
        }
        catch (err) {
            logger.error('error while deleting a recipe ', err);
            throw new error_1.CustomError(err.message, err.code);
        }
    });
}
exports.deleteRecipeP = deleteRecipeP;
