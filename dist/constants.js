"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HASH_ROUNDS = exports.HttpStatusMessage = void 0;
/**
 * Http status messages
 */
exports.HttpStatusMessage = {
    Success: 'Success',
    InternalServerError: 'Internal server error',
    BadRequestError: 'Invalid request passed',
    NotFoundError: 'No resource found',
    UnAuthorizedError: 'Invalid login credentials',
    InvalidTokenCredentials: 'Invalid token credentials',
};
exports.HASH_ROUNDS = 12;
