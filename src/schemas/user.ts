import Joi from '@hapi/joi';

/**
 * USER_POST_REQUEST_SCHEMA
 */
export const USER_POST_REQUEST_SCHEMA = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.number().required(),
});

/**
 * USER_PATCH_REQUEST_SCHEMA
 */
export const USER_PATCH_REQUEST_SCHEMA = Joi.object().keys({
  username: Joi.string().required(),
});
