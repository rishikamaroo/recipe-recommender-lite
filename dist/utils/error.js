"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.InternalServerError = exports.NotFoundError = exports.InvalidRequestError = exports.ValidationError = void 0;
/**
 * Validation error
 */
class ValidationError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 400 /* BadRequest */;
    }
}
exports.ValidationError = ValidationError;
/**
 * Invalid request error
 */
class InvalidRequestError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 400 /* BadRequest */;
    }
}
exports.InvalidRequestError = InvalidRequestError;
/**
 * Not found error
 */
class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 404 /* NotFound */;
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Internal server error
 */
class InternalServerError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 500 /* InternalServerError */;
    }
}
exports.InternalServerError = InternalServerError;
/**
 * Custom error
 */
class CustomError extends Error {
    constructor(message, code) {
        super();
        this.message =
            message ||
                'The action you are trying to take is not avialable, please contact Author for suggestions';
        this.code = code || 500 /* InternalServerError */;
    }
}
exports.CustomError = CustomError;