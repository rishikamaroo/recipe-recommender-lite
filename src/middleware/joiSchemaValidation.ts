import Joi from '@hapi/joi';
import _ from 'lodash';
import { HTTPStatusCode } from '../constants';
import * as recipe from '../schemas/recipe';

const BadRequest = HTTPStatusCode.BadRequest;
export const validatePostRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_POST_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    if (!_.isEmpty(errMessage)) {
      res.status(BadRequest).json({
        status: BadRequest,
        message: 'Invalid fields',
        body: [{ err: errMessage, path: 'recipe' }],
      });
    }
  }
};

export const validateGetRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_GET_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    if (!_.isEmpty(errMessage)) {
      res.status(BadRequest).json({
        status: BadRequest,
        message: 'Invalid fields',
        body: [{ err: errMessage, path: 'recipe' }],
      });
    }
  }
};

export const validatePatchRequestBody = (req: any, res: any, next: any) => {
  try {
    Joi.assert(req.body, recipe.RECIPE_PATCH_REQUEST_SCHEMA, { convert: false });
    return next();
  } catch (err) {
    const errMessage = _.get(err, 'details[0].message');
    if (!_.isEmpty(errMessage)) {
      res.status(BadRequest).json({
        status: BadRequest,
        message: 'Invalid fields',
        body: [{ err: errMessage, path: 'recipe' }],
      });
    }
  }
};
