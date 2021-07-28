"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = require("../utils/logger");
/**
 * Error handler function
 *
 * @param err - Error
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
function errorHandler(err, req, res, _next) {
    const logger = new logger_1.Logger();
    logger.error('API request failed!', err);
    const code = lodash_1.default.get(err, 'code');
    res.json(err);
    if (code) {
        res.status(code);
    }
    res.status(500 /* InternalServerError */).json({ message: err.message });
}
exports.errorHandler = errorHandler;
