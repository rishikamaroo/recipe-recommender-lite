"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBadRequestErrorResponse = exports.generateNotFoundErrorResponse = exports.generateInternalServerErrorResponse = exports.generateCreateSuccessResponse = exports.generateSuccessResponse = void 0;
const constants_1 = require("../constants");
/**
 * Function to generate get successfull response
 *
 * @param res - Result param
 * @param result - IRecipe | IRecipe[] param
 */
const generateSuccessResponse = (res, result) => {
    res.status(200 /* OK */).json({
        status: 200 /* OK */,
        message: constants_1.HttpStatusMessage.Success,
        body: result ? [result] : [],
    });
};
exports.generateSuccessResponse = generateSuccessResponse;
/**
 * Function to generate create successfull response
 *
 * @param res - Result param
 * @param result - IRecipe param
 */
const generateCreateSuccessResponse = (res, result) => {
    res.status(201 /* Created */).json({
        status: 201 /* Created */,
        message: constants_1.HttpStatusMessage.Success,
        body: result ? [result] : [],
    });
};
exports.generateCreateSuccessResponse = generateCreateSuccessResponse;
/**
 * Function to generate internal server error response
 *
 * @param res - Result param
 * @param err - Error
 */
const generateInternalServerErrorResponse = (res, err) => {
    res.status(500 /* InternalServerError */).json({
        status: 500 /* InternalServerError */,
        message: constants_1.HttpStatusMessage.InternalServerError,
        body: [{ err: err }],
    });
};
exports.generateInternalServerErrorResponse = generateInternalServerErrorResponse;
/**
 * Function to generate not found error response
 *
 * @param res - Result param
 * @param err - Error
 */
const generateNotFoundErrorResponse = (res, err) => {
    res.status(404 /* NotFound */).json({
        status: 404 /* NotFound */,
        message: constants_1.HttpStatusMessage.NotFoundError,
        body: [{ err: err }],
    });
};
exports.generateNotFoundErrorResponse = generateNotFoundErrorResponse;
/**
 * Function to generate bad request error response
 *
 * @param res - Result param
 * @param err - Error
 */
const generateBadRequestErrorResponse = (res, err) => {
    res.status(400 /* BadRequest */).json({
        status: 400 /* BadRequest */,
        message: constants_1.HttpStatusMessage.BadRequestError,
        body: [{ err: err }],
    });
};
exports.generateBadRequestErrorResponse = generateBadRequestErrorResponse;
