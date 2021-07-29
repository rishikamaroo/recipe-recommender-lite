import { HTTPStatusCode, HttpStatusMessage } from '../constants';

/**
 * Function to generate get successfull response
 *
 * @param res - Result param
 * @param result - any
 */
export const generateSuccessResponse = (res: any, result?: any) => {
  res.status(HTTPStatusCode.OK).json({
    status: HTTPStatusCode.OK,
    message: HttpStatusMessage.Success,
    body: result ? [result] : [],
  });
};

/**
 * Function to generate create successfull response
 *
 * @param res - Result param
 * @param result - any
 */
export const generateCreateSuccessResponse = (res: any, result?: any) => {
  res.status(HTTPStatusCode.Created).json({
    status: HTTPStatusCode.Created,
    message: HttpStatusMessage.Success,
    body: result ? [result] : [],
  });
};

/**
 * Function to generate internal server error response
 *
 * @param res - Result param
 * @param err - Error
 */
export const generateInternalServerErrorResponse = (res: any, err: any) => {
  res.status(HTTPStatusCode.InternalServerError).json({
    status: HTTPStatusCode.InternalServerError,
    message: HttpStatusMessage.InternalServerError,
    body: [{ err: err }],
  });
};

/**
 * Function to generate not found error response
 *
 * @param res - Result param
 * @param err - Error
 */
export const generateNotFoundErrorResponse = (res: any, err: any) => {
  res.status(HTTPStatusCode.NotFound).json({
    status: HTTPStatusCode.NotFound,
    message: HttpStatusMessage.NotFoundError,
    body: [{ err: err }],
  });
};

/**
 * Function to generate bad request error response
 *
 * @param res - Result param
 * @param err - Error
 */
export const generateBadRequestErrorResponse = (res: any, err: any) => {
  res.status(HTTPStatusCode.BadRequest).json({
    status: HTTPStatusCode.BadRequest,
    message: HttpStatusMessage.BadRequestError,
    body: [{ err: err }],
  });
};

/**
 * Function to generate login auth failure response
 *
 * @param res - Result param
 * @param result - any
 */
export const generateAuthFailureResponse = (res: any, result?: any) => {
  res.status(HTTPStatusCode.Unauthorized).json({
    status: HTTPStatusCode.Unauthorized,
    message: HttpStatusMessage.UnAuthorizedError,
    body: result ? [result] : [],
  });
};

/**
 * Function to generate login auth failure response
 *
 * @param res - Result param
 * @param result - any
 */
export const generateInvalidTokenResponse = (res: any, result?: any) => {
  res.status(HTTPStatusCode.Unauthorized).json({
    status: HTTPStatusCode.Unauthorized,
    message: HttpStatusMessage.InvalidTokenCredentials,
    body: result ? [result] : [],
  });
};
