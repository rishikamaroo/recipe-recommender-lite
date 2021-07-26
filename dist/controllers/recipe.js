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
exports.deleteRecipe = exports.patchRecipe = exports.getRecipe = exports.createRecipe = void 0;
const uuid_1 = require("uuid");
const recipe_1 = require("../models/recipe");
const createRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.body.text;
        const result = yield recipe_1.createRecipeP(uuid_1.v4().toString(), text);
        res.status(201 /* Created */).json({
            message: 'Created the recipe.',
            createRecipe: { id: result.id, text: result.text },
        });
    }
    catch (err) {
        res.status(500 /* InternalServerError */).json({ err: err });
    }
});
exports.createRecipe = createRecipe;
const getRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield recipe_1.getRecipeP(id);
        res.status(200 /* OK */).json({ Recipe: result });
    }
    catch (err) {
        res.status(404 /* NotFound */).json({ err: err });
    }
});
exports.getRecipe = getRecipe;
const patchRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const text = req.body.text;
        const result = yield recipe_1.patchRecipeP(id, text);
        res.status(200 /* OK */).json({ Recipe: result });
    }
    catch (err) {
        res.status(404 /* NotFound */).json({ err: err });
    }
});
exports.patchRecipe = patchRecipe;
const deleteRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield recipe_1.deleteRecipeP(id);
        res.status(200 /* OK */).json({ Recipe: result });
    }
    catch (err) {
        res.status(404 /* NotFound */).json({ err: err });
    }
});
exports.deleteRecipe = deleteRecipe;
