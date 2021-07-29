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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUser = exports.getUser = exports.signup = void 0;
const uuid_1 = require("uuid");
const response_1 = require("../utils/response");
const user_1 = require("../models/user");
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
        yield user_1.createUserP(userBody);
        response_1.generateCreateSuccessResponse(res);
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
