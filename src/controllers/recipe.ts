import * as _ from 'lodash';
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createRecipeP, deleteRecipeP, getRecipeP, patchRecipeP } from '../models/recipe';
import { HTTPStatusCode } from '../constants';

export const createRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const text = (req.body as { text: string }).text;
    const result = await createRecipeP(uuidv4().toString(), text);
    res.status(HTTPStatusCode.Created).json({
      message: 'Created the recipe.',
      createRecipe: { id: result.id, text: result.text },
    });
  } catch (err) {
    res.status(HTTPStatusCode.InternalServerError).json({ err: err });
  }
};

export const getRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const result = await getRecipeP(id);
    res.status(HTTPStatusCode.OK).json({ Recipe: result });
  } catch (err) {
    res.status(HTTPStatusCode.NotFound).json({ err: err });
  }
};

export const patchRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const text = (req.body as { text: string }).text;
    const result = await patchRecipeP(id, text);
    res.status(HTTPStatusCode.OK).json({ Recipe: result });
  } catch (err) {
    res.status(HTTPStatusCode.NotFound).json({ err: err });
  }
};

export const deleteRecipe: RequestHandler = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const result = await deleteRecipeP(id);
    res.status(HTTPStatusCode.OK).json({ Recipe: result });
  } catch (err) {
    res.status(HTTPStatusCode.NotFound).json({ err: err });
  }
};
