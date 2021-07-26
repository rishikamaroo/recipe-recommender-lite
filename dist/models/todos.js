"use strict";
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
exports.getTodoP = exports.createTodoP = exports.Todo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const error_1 = require("../utils/error");
const todoSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
});
const Todo = mongoose_1.default.model('Todo', todoSchema);
exports.Todo = Todo;
const logger = new logger_1.Logger();
function createTodoP(id, text) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('creating a Todo for id: ', id);
        try {
            const result = yield Todo.create({ id: id, text: text });
            return result;
        }
        catch (err) {
            logger.error('error while creating a Todo ', err);
            throw new error_1.InvalidRequestError(err.message);
        }
    });
}
exports.createTodoP = createTodoP;
function getTodoP(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('getting a Todo for id: ', id);
        try {
            const result = yield Todo.find({ id: id });
            if (result.length === 0) {
                throw new error_1.NotFoundError('no record found for id: ' + id);
            }
            return result;
        }
        catch (err) {
            logger.error('error while getting a Todo ', err);
            throw new error_1.CustomError(err.message, err.code);
        }
    });
}
exports.getTodoP = getTodoP;
