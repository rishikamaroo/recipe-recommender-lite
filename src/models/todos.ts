import mongoose from "mongoose";
import { ITodo } from "../types";
import { Logger } from "../utils/logger";
import {
  CustomError,
  InvalidRequestError,
  NotFoundError,
} from "../utils/error";

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
const logger = new Logger();

async function createTodoP(id: string, text: string): Promise<ITodo> {
  logger.debug("creating a Todo for id: ", id);
  try {
    const result = await Todo.create({ id: id, text: text });
    return result;
  } catch (err) {
    logger.error("error while creating a Todo ", err);
    throw new InvalidRequestError(err.message);
  }
}

async function getTodoP(id: string): Promise<ITodo[]> {
  logger.debug("getting a Todo for id: ", id);
  try {
    const result = await Todo.find({ id: id });
    if (result.length === 0) {
      throw new NotFoundError("no record found for id: " + id);
    }
    return result;
  } catch (err) {
    logger.error("error while getting a Todo ", err);
    throw new CustomError(err.message, err.code);
  }
}

export { Todo, createTodoP, getTodoP };
