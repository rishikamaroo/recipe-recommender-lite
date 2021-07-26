import mongoose from "mongoose";
import { ITodo } from "../types";
import { Logger } from "../utils/logger";
import { InvalidRequest, NotFoundError } from "../utils/error";

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
const logger = new Logger();

async function createTodoP(id: string, text: string): Promise<ITodo> {
  logger.debug("creating a Todo", ...id);
  try {
    const result = await Todo.create({ id: id, text: text });
    logger.debug("created one ", JSON.stringify(result));
    return result;
  } catch (err) {
    logger.error("error while creating a Todo ", ...err);
    throw new InvalidRequest(err.message);
  }
}

async function getTodoP(id: string): Promise<ITodo[]> {
  logger.debug("getting a Todo", id);
  try {
    const result = await Todo.find({ id: id });
    logger.debug("found " + result);
    return result;
  } catch (err) {
    logger.error("error while getting a Todo ", ...err);
    throw new NotFoundError(err.message);
  }
}

export { Todo, createTodoP, getTodoP };
