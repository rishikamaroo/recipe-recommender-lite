"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNotFoundErrorResponse = exports.generateInternalServerErrorResponse = exports.generateCreateSuccessResponse = exports.generateSuccessResponse = void 0;
const constants_1 = require("../constants");
const generateSuccessResponse = (res, result) => {
    res.status(200 /* OK */).json({
        status: 200 /* OK */,
        message: constants_1.HttpStatusMessage.Success,
        body: [result],
    });
};
exports.generateSuccessResponse = generateSuccessResponse;
const generateCreateSuccessResponse = (res, result) => {
    res.status(201 /* Created */).json({
        status: 201 /* Created */,
        message: constants_1.HttpStatusMessage.Success,
        body: [result],
    });
};
exports.generateCreateSuccessResponse = generateCreateSuccessResponse;
const generateInternalServerErrorResponse = (res, err) => {
    res.status(500 /* InternalServerError */).json({
        status: 500 /* InternalServerError */,
        message: constants_1.HttpStatusMessage.InternalServerError,
        body: [{ err: err }],
    });
};
exports.generateInternalServerErrorResponse = generateInternalServerErrorResponse;
const generateNotFoundErrorResponse = (res, err) => {
    res.status(404 /* NotFound */).json({
        status: 404 /* NotFound */,
        message: constants_1.HttpStatusMessage.NotFoundError,
        body: [{ err: err }],
    });
};
exports.generateNotFoundErrorResponse = generateNotFoundErrorResponse;
