import * as Joi from '@hapi/joi';

/**
 * RECIPE_POST_REQUEST_SCHEMA
 */
export const RECIPE_POST_REQUEST_SCHEMA = Joi.object().keys({
  text: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string(),
  suggestions: Joi.object(),
  s3ImageAddress: Joi.string(),
  calories: Joi.number(),
});

/**
 * RECIPE_GET_REQUEST_SCHEMA
 */
export const RECIPE_GET_REQUEST_SCHEMA = Joi.object().keys({
  text: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
  suggestions: Joi.object(),
  s3ImageAddress: Joi.string(),
  calories: Joi.number(),
});

/**
 * RECIPE_PATCH_REQUEST_SCHEMA
 */
export const RECIPE_PATCH_REQUEST_SCHEMA = Joi.object().keys({
  text: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string(),
  suggestions: Joi.object(),
  s3ImageAddress: Joi.string(),
  calories: Joi.number(),
});
