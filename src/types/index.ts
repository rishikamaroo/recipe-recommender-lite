import mongoose from "mongoose";

export interface LogInterface {
  debug(primaryMessage: string, ...supportingData: any[]): void;
  info(primaryMessage: string, ...supportingData: any[]): void;
  warn(primaryMessage: string, ...supportingData: any[]): void;
  error(primaryMessage: string, ...supportingData: any[]): void;
}

export interface ITodo extends mongoose.Document {
  id: string;
  text: string;
}

export interface IException {
  code: number;
  message?: string;
}
