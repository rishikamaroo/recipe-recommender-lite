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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.patchTodo = exports.getTodo = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const todos_1 = require("../models/todos");
const createTodo = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.body.text;
        const result = yield todos_1.createTodoP(uuid_1.v4().toString(), text);
        res.status(201 /* Created */).json({
            message: 'Created the todo.',
            createTodo: { id: result.id, text: result.text },
        });
    }
    catch (err) {
        res.status(500 /* InternalServerError */).json({ err: err });
    }
});
exports.createTodo = createTodo;
const getTodo = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const result = yield todos_1.getTodoP(id);
        res.status(200 /* OK */).json({ todo: result });
    }
    catch (err) {
        res.status(404 /* NotFound */).json({ err: err });
    }
});
exports.getTodo = getTodo;
const patchTodo = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const text = req.body.text;
        const result = yield todos_1.patchTodoP(id, text);
        res.status(200 /* OK */).json({ todo: result });
    }
    catch (err) {
        res.status(404 /* NotFound */).json({ err: err });
    }
});
exports.patchTodo = patchTodo;
const deleteTodo = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield todos_1.deleteTodoP(id);
        res.status(200 /* OK */).json({ todo: result });
    }
    catch (err) {
        res.status(404 /* NotFound */).json({ err: err });
    }
});
exports.deleteTodo = deleteTodo;
