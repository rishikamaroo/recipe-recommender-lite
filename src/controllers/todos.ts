import * as _ from 'lodash';
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createTodoP, deleteTodoP, getTodoP, patchTodoP } from '../models/todos';
import { HTTPStatusCode } from '../constants';

export const createTodo: RequestHandler = async (req, res, _next) => {
  try {
    const text = (req.body as { text: string }).text;
    const result = await createTodoP(uuidv4().toString(), text);
    res.status(HTTPStatusCode.Created).json({
      message: 'Created the todo.',
      createTodo: { id: result.id, text: result.text },
    });
  } catch (err) {
    res.status(HTTPStatusCode.InternalServerError).json({ err: err });
  }
};

export const getTodo: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.body.id;
    const result = await getTodoP(id);
    res.status(HTTPStatusCode.OK).json({ todo: result });
  } catch (err) {
    res.status(HTTPStatusCode.NotFound).json({ err: err });
  }
};

export const patchTodo: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const text = (req.body as { text: string }).text;
    const result = await patchTodoP(id, text);
    res.status(HTTPStatusCode.OK).json({ todo: result });
  } catch (err) {
    res.status(HTTPStatusCode.NotFound).json({ err: err });
  }
};

export const deleteTodo: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const result = await deleteTodoP(id);
    res.status(HTTPStatusCode.OK).json({ todo: result });
  } catch (err) {
    res.status(HTTPStatusCode.NotFound).json({ err: err });
  }
};
