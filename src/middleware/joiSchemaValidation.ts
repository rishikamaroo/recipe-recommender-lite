import Joi from '@hapi/joi';
import _ from 'lodash';
import { HTTPStatusCode } from '../constants';
import * as recipe from '../schemas/recipe';
import * as user from '../schemas/user';
import { generateBadRequestErrorResponse } from '../utils/response';

const BadRequest = HTTPStatusCode.BadRequest;

/**
 * Post recipe request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validateRecipePostRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_POST_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};

/**
 * Get recipe request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validateRecipeGetRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_GET_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};

/**
 * Patch recipe request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validateRecipePatchRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_PATCH_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};

/**
 * Post user request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validateUserPostRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, user.USER_POST_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};

/**
 * Patch recipe request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validateUserPatchRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, user.USER_PATCH_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};
