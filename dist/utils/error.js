"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.InvalidRequest = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = '401';
    }
}
exports.ValidationError = ValidationError;
class InvalidRequest extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = '401';
    }
}
exports.InvalidRequest = InvalidRequest;
class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = '404';
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = '500';
    }
}
exports.InternalServerError = InternalServerError;
