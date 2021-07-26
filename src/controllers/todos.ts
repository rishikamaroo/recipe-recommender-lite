import * as _ from "lodash";
import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { createTodoP, getTodoP } from "../models/todos";

export const createTodo: RequestHandler = async (req, res, _next) => {
  const text = (req.body as { text: string }).text;
  const result = await createTodoP(uuidv4().toString(), text);
  res.status(201).json({
    message: "Created the todo.",
    createTodo: { id: result.id, text: result.text },
  });
};

export const getTodo: RequestHandler = async (req, res, _next) => {
  const id = req.body.id;
  const result = await getTodoP(id);
  res.status(200).json({ todo: result });
};
