/* Copyright (c) 2021 Rishika Maroo */

import mongoose from 'mongoose';
import { RecipeTypes } from '../constants';

/**
 * Log interface
 */
export interface LogInterface {
  debug(primaryMessage: string, ...supportingData: any[]): void;
  info(primaryMessage: string, ...supportingData: any[]): void;
  warn(primaryMessage: string, ...supportingData: any[]): void;
  error(primaryMessage: string, ...supportingData: any[]): void;
}

/**
 * Irecipe interface
 */
export interface IRecipe extends mongoose.Document {
  id: string;
  text: string;
  description?: string;
  suggestions?: {};
  type?: RecipeTypes;
  s3ImageAddress?: string;
  calories?: number;
}

/**
 * IUser interface
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  phoneNumber: number;
}

/**
 * Iexception interface
 */
export interface IException {
  code: number;
  message?: string;
}

/**
 * Ctx interface
 */
export interface Ctx {
  appRequestId: string;
  user?: IUser;
}
