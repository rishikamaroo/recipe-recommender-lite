/* Copyright (c) 2021 Rishika Maroo */

import mongoose from 'mongoose';
import { IRecipe } from '../types';
import { Logger } from '../utils/logger';
import { CustomError, InvalidRequestError, NotFoundError } from '../utils/error';
import _ from 'lodash';

const RecipeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (_doc, ret, _option) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Recipe = mongoose.model('Recipe', RecipeSchema);
const logger = new Logger();

/**
 * Creates a recipe
 *
 * @param id - recipe id
 * @param text - recipe text
 * @returns Promise<IRecipe>
 */
async function createRecipeP(id: string, text: string): Promise<IRecipe> {
  logger.debug('creating a recipe for id: ', id);
  try {
    const result = await Recipe.create({ id: id, text: text });
    return result.toObject();
  } catch (err) {
    logger.error('error while creating a recipe ', err);
    throw new InvalidRequestError(err.message);
  }
}

/**
 * Gets recipe for given id
 *
 * @param id - recipe id
 * @returns Promise<IRecipe>
 */
async function getRecipeP(id: string): Promise<IRecipe> {
  logger.debug('getting a recipe for id: ', id);
  try {
    const results = await Recipe.find({ id: id });
    if (results.length === 0) {
      throw new NotFoundError('no record found for id: ' + id);
    }
    return _.map(results, (result) => result.toObject())[0];
  } catch (err) {
    logger.error('error while getting a recipe ', err);
    throw new CustomError(err.message, err.code);
  }
}

/**
 * Gets all the recipes
 *
 * @param id - recipe id
 * @returns Promise<IRecipe>
 */
async function getRecipesP(): Promise<IRecipe[]> {
  logger.debug('getting all the recipies');
  try {
    const results = await Recipe.find({});
    return _.map(results, (result) => result.toObject());
  } catch (err) {
    logger.error('error while getting recipes ', err);
    throw new CustomError(err.message, err.code);
  }
}

/**
 * Patches recipe for given id
 *
 * @param id - recipe id
 * @param text - recipe text
 * @returns Promise<IRecipe>
 */
async function patchRecipeP(id: string, text: string): Promise<IRecipe> {
  logger.debug('patching text recipe for id & text: ', [id, text]);
  if (!text) {
    throw new InvalidRequestError('cannot update recipe with null text');
  }

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
    return updatedResult.toObject();
  } catch (err) {
    logger.error('error while patching text to a Recipe ', err);
    throw new CustomError(err.message, err.code);
  }
}

/**
 * Deletes recipe for given id
 *
 * @param id - recipe id
 * @returns Promise<void>
 */
async function deleteRecipeP(id: string): Promise<void> {
  logger.warn('deleting a recipe for id: ', id);
  try {
    const updatedResult = await Recipe.deleteOne({ id: id });
    if (updatedResult.deletedCount === 0) {
      throw new NotFoundError('the record you are trying to remove does not exist with id: ' + id);
    }
  } catch (err) {
    logger.error('error while deleting a recipe ', err);
    throw new CustomError(err.message, err.code);
  }
}

export { Recipe, createRecipeP, deleteRecipeP, getRecipeP, getRecipesP, patchRecipeP };
