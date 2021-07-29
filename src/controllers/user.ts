/* Copyright (c) 2021 Rishika Maroo */

import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  generateAuthFailureResponse,
  generateCreateSuccessResponse,
  generateInternalServerErrorResponse,
  generateNotFoundErrorResponse,
  generateSuccessResponse,
} from '../utils/response';
import { createUserP, getUserLoginP, getUserP, updateUserP } from '../models/user';
import { IUser } from '../types';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

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

/**
 * login is a request handler to log in the user
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
export const login: RequestHandler = async (req, res, _next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const result = await getUserLoginP(username, password);
    if (result) {
      const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1d' });
      generateSuccessResponse(res, token);
    } else {
      generateAuthFailureResponse(res);
    }
  } catch (err) {
    generateNotFoundErrorResponse(res, err);
  }
};
