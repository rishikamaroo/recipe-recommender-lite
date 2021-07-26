import mongoose from 'mongoose';
import { ITodo } from '../types';
import { Logger } from '../utils/logger';
import { CustomError, InvalidRequestError, NotFoundError } from '../utils/error';

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);
const logger = new Logger();

async function createTodoP(id: string, text: string): Promise<ITodo> {
  logger.debug('creating a Todo for id: ', id);
  try {
    const result = await Todo.create({ id: id, text: text });
    return result;
  } catch (err) {
    logger.error('error while creating a Todo ', err);
    throw new InvalidRequestError(err.message);
  }
}

async function getTodoP(id: string): Promise<ITodo[]> {
  logger.debug('getting a Todo for id: ', id);
  try {
    const result = await Todo.find({ id: id });
    if (result.length === 0) {
      throw new NotFoundError('no record found for id: ' + id);
    }
    return result;
  } catch (err) {
    logger.error('error while getting a Todo ', err);
    throw new CustomError(err.message, err.code);
  }
}

async function patchTodoP(id: string, text: string): Promise<ITodo> {
  logger.debug('patching text Todo for id & text: ', [id, text]);
  try {
    const updatedResult = await Todo.findOneAndUpdate(
      { id: id },
      { $set: { text: text } },
      { new: true },
    );
    if (!updatedResult) {
      throw new NotFoundError('no record found for id: ' + id);
    }
    logger.debug('the result is updated ', updatedResult);
    return updatedResult;
  } catch (err) {
    logger.error('error while patching text to a Todo ', err);
    throw new CustomError(err.message, err.code);
  }
}

async function deleteTodoP(id: string): Promise<void> {
  logger.warn('deleting a Todo for id: ', id);
  try {
    const updatedResult = await Todo.deleteOne({ id: id });
    if (updatedResult.deletedCount === 0) {
      throw new NotFoundError('the record you are trying to remove does not exist with id: ' + id);
    }
  } catch (err) {
    logger.error('error while delete a Todo ', err);
    throw new CustomError(err.message, err.code);
  }
}

export { Todo, createTodoP, deleteTodoP, getTodoP, patchTodoP };
