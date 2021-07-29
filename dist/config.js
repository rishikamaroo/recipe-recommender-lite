"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPEORM_CONFIG = exports.PORT = exports.POSTGRES_CONNECT_URL = exports.POSTGRES_DB_NAME = exports.POSTGRES_PASSWORD = exports.POSTGRES_USER = exports.POSTGRES_HOST = exports.POSTGRES_PORT = exports.MONGO_CONNECT_URL = exports.MONGO_DB_NAME = exports.MONGO_HOST = exports.MONGO_PORT = void 0;
const user_1 = require("./entities/user");
const dotenv = require('dotenv');
dotenv.config();
/**
 * MONGO DB
 */
exports.MONGO_PORT = process.env.MONGO_PORT || 27017;
exports.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
exports.MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'recipe';
exports.MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL || `mongodb://${exports.MONGO_HOST}:${exports.MONGO_PORT}`;
/**
 * POSTGRES DB
 */
exports.POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
exports.POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
exports.POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '1234';
exports.POSTGRES_DB_NAME = 'typeormdemo';
exports.POSTGRES_CONNECT_URL = process.env.POSTGRES_CONNECT_URL ||
    `postgres://${exports.POSTGRES_USER}:${exports.POSTGRES_PASSWORD}@${exports.POSTGRES_HOST}:${exports.POSTGRES_PORT}`;
/**
 * SERVER
 */
exports.PORT = process.env.PORT || 3000;
/**
 * TYPEORM
 */
exports.TYPEORM_CONFIG = {
    type: 'postgres',
    host: exports.POSTGRES_HOST,
    port: exports.POSTGRES_PORT,
    username: exports.POSTGRES_USER,
    password: exports.POSTGRES_PASSWORD,
    database: exports.POSTGRES_DB_NAME,
    synchronize: true,
    entities: [user_1.UserAccount],
};
