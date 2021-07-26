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
const express_1 = __importDefault(require("express"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./utils/logger");
const config_1 = require("./config");
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_1.Logger();
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () { });
        mongoose_1.default.connect(`${config_1.MONGO_CONNECT_URL}/recipe`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => {
            logger.info('*** Connected to database');
        });
        mongoose_1.default.set('useFindAndModify', false);
    });
}
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initDb();
        const app = express_1.default();
        app.use(body_parser_1.json());
        app.use('/recipe', recipe_1.default);
        app.use((err, req, res, next) => {
            res.status(500 /* InternalServerError */).json({ message: err.message });
        });
        app.listen(config_1.PORT);
    });
}
createApp();
