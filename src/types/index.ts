import mongoose from 'mongoose';
import { RecipeTypes } from '../constants';

export interface LogInterface {
  debug(primaryMessage: string, ...supportingData: any[]): void;
  info(primaryMessage: string, ...supportingData: any[]): void;
  warn(primaryMessage: string, ...supportingData: any[]): void;
  error(primaryMessage: string, ...supportingData: any[]): void;
}

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

export interface IException {
  code: number;
  message?: string;
}
