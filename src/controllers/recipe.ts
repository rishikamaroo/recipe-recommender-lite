/* Copyright (c) 2021 Rishika Maroo */

import * as _ from 'lodash';
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  createRecipeP,
  deleteRecipeP,
  getRecipeP,
  getRecipesP,
  patchRecipeP,
} from '../models/recipe';
import { IRecipe } from '../types';
import {
  generateCreateSuccessResponse,
  generateInternalServerErrorResponse,
  generateSuccessResponse,
  generateNotFoundErrorResponse,
} from '../utils/response';

/**
 * createRecipe is a request handler to create a recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const createRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const text = (req.body as { text: string }).text;
    const result: IRecipe = await createRecipeP(uuidv4().toString(), text);
    generateCreateSuccessResponse(res, result);
  } catch (err) {
    generateInternalServerErrorResponse(res, err);
  }
};

/**
 * getRecipe is a request handler to get a given recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const getRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const result = await getRecipeP(id);
    generateSuccessResponse(res, result);
  } catch (err) {
    generateNotFoundErrorResponse(res, err);
  }
};

/**
 * patchRecipe is a request handler  to update a recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const patchRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const text = (req.body as { text: string }).text;
    const result = await patchRecipeP(id, text);
    generateSuccessResponse(res, result);
  } catch (err) {
    generateNotFoundErrorResponse(res, err);
  }
};

/**
 * deleteRecipe is a request handler to delete a recipe
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const deleteRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    await deleteRecipeP(id);
    generateSuccessResponse(res);
  } catch (err) {
    generateNotFoundErrorResponse(res, err);
  }
};

/**
 * getRecipes is a request handler to get all the recipies
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const getRecipes: RequestHandler = async (_req, res, _next) => {
  try {
    const result = await getRecipesP();
    generateSuccessResponse(res, result);
  } catch (err) {
    generateInternalServerErrorResponse(res, err);
  }
};
