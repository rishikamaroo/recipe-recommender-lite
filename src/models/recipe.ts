/* Copyright (c) 2021 Rishika Maroo */

import mongoose from 'mongoose';
import { IRecipe } from '../types';
import { Logger } from '../utils/logger';
import { CustomError, InvalidRequestError, NotFoundError } from '../utils/error';

const RecipeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);
const logger = new Logger();

async function createRecipeP(id: string, text: string): Promise<IRecipe> {
  logger.debug('creating a recipe for id: ', id);
  try {
    const result = await Recipe.create({ id: id, text: text });
    return result;
  } catch (err) {
    logger.error('error while creating a recipe ', err);
    throw new InvalidRequestError(err.message);
  }
}

async function getRecipeP(id: string): Promise<IRecipe[]> {
  logger.debug('getting a recipe for id: ', id);
  try {
    const result = await Recipe.find({ id: id });
    if (result.length === 0) {
      throw new NotFoundError('no record found for id: ' + id);
    }
    return result;
  } catch (err) {
    logger.error('error while getting a recipe ', err);
    throw new CustomError(err.message, err.code);
  }
}

async function patchRecipeP(id: string, text: string): Promise<IRecipe> {
  logger.debug('patching text recipe for id & text: ', [id, text]);
  try {
    const updatedResult = await Recipe.findOneAndUpdate(
      { id: id },
      { $set: { text: text } },
      { new: true },
    );
    if (!updatedResult) {
      throw new NotFoundError('no record found for id: ' + id);
    }
    logger.debug('the result is updated ', updatedResult);
    return updatedResult;
  } catch (err) {
    logger.error('error while patching text to a Recipe ', err);
    throw new CustomError(err.message, err.code);
  }
}

async function deleteRecipeP(id: string): Promise<void> {
  logger.warn('deleting a recipe for id: ', id);
  try {
    const updatedResult = await Recipe.deleteOne({ id: id });
    if (updatedResult.deletedCount === 0) {
      throw new NotFoundError('the record you are trying to remove does not exist with id: ' + id);
    }
  } catch (err) {
    logger.error('error while delete a Recipe ', err);
    throw new CustomError(err.message, err.code);
  }
}

export { Recipe, createRecipeP, deleteRecipeP, getRecipeP, patchRecipeP };
