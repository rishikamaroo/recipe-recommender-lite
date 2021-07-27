import { HTTPStatusCode, HttpStatusMessage } from '../constants';
import { IRecipe } from '../types';

export const generateSuccessResponse = (res: any, result?: IRecipe | IRecipe[]) => {
  res.status(HTTPStatusCode.OK).json({
    status: HTTPStatusCode.OK,
    message: HttpStatusMessage.Success,
    body: [result],
  });
};

export const generateCreateSuccessResponse = (res: any, result: IRecipe) => {
  res.status(HTTPStatusCode.Created).json({
    status: HTTPStatusCode.Created,
    message: HttpStatusMessage.Success,
    body: [result],
  });
};

export const generateInternalServerErrorResponse = (res: any, err: any) => {
  res.status(HTTPStatusCode.InternalServerError).json({
    status: HTTPStatusCode.InternalServerError,
    message: HttpStatusMessage.InternalServerError,
    body: [{ err: err }],
  });
};

export const generateNotFoundErrorResponse = (res: any, err: any) => {
  res.status(HTTPStatusCode.NotFound).json({
    status: HTTPStatusCode.NotFound,
    message: HttpStatusMessage.NotFoundError,
    body: [{ err: err }],
  });
};
