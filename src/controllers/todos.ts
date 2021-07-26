import * as _ from 'lodash';
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createTodoP, getTodoP } from '../models/todos';
import { HTTPStatusCode } from '../constants';

export const createTodo: RequestHandler = async (req, res, _next) => {
  const text = (req.body as { text: string }).text;
  const result = await createTodoP(uuidv4().toString(), text);
  res.status(HTTPStatusCode.Created).json({
    message: 'Created the todo.',
    createTodo: { id: result.id, text: result.text },
  });
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
