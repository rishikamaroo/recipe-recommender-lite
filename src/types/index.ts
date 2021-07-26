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
  createdDate?: Date;
  suggestions?: {};
  type?: RecipeTypes;
  lastUpdateDate?: Date;
  s3ImageAddress?: string;
}

/**
 * Iexception interface
 */
export interface IException {
  code: number;
  message?: string;
}
