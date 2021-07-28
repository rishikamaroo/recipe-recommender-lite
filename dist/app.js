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
const cors_1 = __importDefault(require("cors"));
const pg_1 = __importDefault(require("pg"));
const express_1 = __importDefault(require("express"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./utils/logger");
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
/**
 * Initializes db connections
 */
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const psqConnectionString = `${config_1.POSTGRES_CONNECT_URL}/${config_1.POSTGRES_DB_NAME}`;
        const client = new pg_1.default.Client(psqConnectionString);
        client.connect();
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () { });
        mongoose_1.default.connect(`${config_1.MONGO_CONNECT_URL}/${config_1.MONGO_DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => {
            logger.info('*** Connected to database.');
        });
        mongoose_1.default.set('useFindAndModify', false);
    });
}
/**
 * Creates app
 */
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initDb();
        const app = express_1.default();
        app.use(cors_1.default());
        app.use(body_parser_1.json());
        app.use('/api/v1/recipe', recipe_1.default);
        app.use(errorHandler_1.errorHandler);
        app.get('/', (_req, res, _next) => {
            return res.status(200 /* OK */).json({
                status: 'ok',
                version: '1.0.0',
            });
        });
        app.listen(config_1.PORT, () => {
            logger.info(`*** Server listening to port: ${config_1.PORT}...`);
        });
        // (TODO) add application level middleware, ex:
        // app.use(diagnosticsMiddleware)
        // app.use(datadogClientMiddleware)
        // (TODO) add sub-stack level middleware, ex:
        // app.get('/status/sla', statusMiddleware)
    });
}
createApp();
const logger = new logger_1.Logger();
