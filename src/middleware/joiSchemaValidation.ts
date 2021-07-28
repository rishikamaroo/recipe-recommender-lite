import Joi from '@hapi/joi';
import _ from 'lodash';
import { HTTPStatusCode } from '../constants';
import * as recipe from '../schemas/recipe';
import { generateBadRequestErrorResponse } from '../utils/response';

const BadRequest = HTTPStatusCode.BadRequest;

/**
 * Post request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validatePostRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_POST_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};

/**
 * Get request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validateGetRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_GET_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};

/**
 * Patch request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
export const validatePatchRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_PATCH_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    generateBadRequestErrorResponse(res, errMessage || err);
  }
};
