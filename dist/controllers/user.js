"use strict";
/* Copyright (c) 2021 Rishika Maroo */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.patchUser = exports.getUser = exports.signup = void 0;
const uuid_1 = require("uuid");
const response_1 = require("../utils/response");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/**
 * signup is a request handler to create a user
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const signup = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBody = Object.assign({ id: uuid_1.v4().toString(), createdAt: new Date() }, req.body);
        const result = yield user_1.createUserP(userBody);
        response_1.generateCreateSuccessResponse(res, result);
    }
    catch (err) {
        response_1.generateInternalServerErrorResponse(res, err);
    }
});
exports.signup = signup;
/**
 * getUser is a request handler to get user details
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const getUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_1.getUserP(id);
        response_1.generateSuccessResponse(res, result);
    }
    catch (err) {
        response_1.generateInternalServerErrorResponse(res, err);
    }
});
exports.getUser = getUser;
/**
 * patchUser is a request handler to update user fields
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const patchUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const username = req.body.username;
        yield user_1.updateUserP(id, username);
        response_1.generateSuccessResponse(res);
    }
    catch (err) {
        response_1.generateNotFoundErrorResponse(res, err);
    }
});
exports.patchUser = patchUser;
/**
 * login is a request handler to log in the user
 *
 * @param req - Request param
 * @param res - Response param
 * @param _next - next function
 */
const login = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = yield user_1.getUserLoginP(username, password);
        if (result) {
            const token = jsonwebtoken_1.default.sign({ username: username }, config_1.SECRET_KEY, { expiresIn: '1d' });
            response_1.generateSuccessResponse(res, token);
        }
        else {
            response_1.generateAuthFailureResponse(res);
        }
    }
    catch (err) {
        response_1.generateNotFoundErrorResponse(res, err);
    }
});
exports.login = login;
