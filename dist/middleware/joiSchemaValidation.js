"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatchRequestBody = exports.validateGetRequestBody = exports.validatePostRequestBody = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const lodash_1 = __importDefault(require("lodash"));
const recipe = __importStar(require("../schemas/recipe"));
const response_1 = require("../utils/response");
const BadRequest = 400 /* BadRequest */;
/**
 * Post request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
const validatePostRequestBody = (req, res, next) => {
    try {
        joi_1.default.assert(req.body, recipe.RECIPE_POST_REQUEST_SCHEMA, { convert: false });
        return next();
    }
    catch (err) {
        const errMessage = lodash_1.default.get(err, 'details[0].message');
        response_1.generateBadRequestErrorResponse(res, errMessage || err);
    }
};
exports.validatePostRequestBody = validatePostRequestBody;
/**
 * Get request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
const validateGetRequestBody = (req, res, next) => {
    try {
        joi_1.default.assert(req.body, recipe.RECIPE_GET_REQUEST_SCHEMA, { convert: false });
        return next();
    }
    catch (err) {
        const errMessage = lodash_1.default.get(err, 'details[0].message');
        response_1.generateBadRequestErrorResponse(res, errMessage || err);
    }
};
exports.validateGetRequestBody = validateGetRequestBody;
/**
 * Patch request body validation function
 *
 * @param req - Request param
 * @param res - Response param
 * @param next - next function
 */
const validatePatchRequestBody = (req, res, next) => {
    try {
        joi_1.default.assert(req.body, recipe.RECIPE_PATCH_REQUEST_SCHEMA, { convert: false });
        return next();
    }
    catch (err) {
        const errMessage = lodash_1.default.get(err, 'details[0].message');
        response_1.generateBadRequestErrorResponse(res, errMessage || err);
    }
};
exports.validatePatchRequestBody = validatePatchRequestBody;
