/* Copyright (c) 2021 Rishika Maroo */

import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  generateCreateSuccessResponse,
  generateInternalServerErrorResponse,
  generateNotFoundErrorResponse,
  generateSuccessResponse,
} from '../utils/response';
import { createUserP, getUserP, updateUserP } from '../models/user';
import { IUser } from '../types';

/**
 * signup is a request handler to create a user
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const signup: RequestHandler = async (req, res, _next) => {
  try {
    const userBody: IUser = {
      id: uuidv4().toString(),
      createdAt: new Date(),
      ...req.body,
    };
    const result = await createUserP(userBody);
    generateCreateSuccessResponse(res, result);
  } catch (err) {
    generateInternalServerErrorResponse(res, err);
  }
};

/**
 * getUser is a request handler to get user details
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const getUser: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const result = await getUserP(id);
    generateSuccessResponse(res, result);
  } catch (err) {
    generateInternalServerErrorResponse(res, err);
  }
};

/**
 * patchUser is a request handler to update user fields
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const patchUser: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const username = req.body.username;
    await updateUserP(id, username);
    generateSuccessResponse(res);
  } catch (err) {
    generateNotFoundErrorResponse(res, err);
  }
};
