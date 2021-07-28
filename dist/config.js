"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRES_DB_NAME = exports.MONGO_DB_NAME = exports.PORT = exports.POSTGRES_PASSWORD = exports.POSTGRES_USER = exports.POSTGRE_HOST = exports.POSTGRES_PORT = exports.MONGO_CONNECT_URL = exports.MONGO_HOST = exports.MONGO_PORT = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.MONGO_PORT = process.env.MONGO_PORT || 27017;
exports.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
exports.MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL || `mongodb://${exports.MONGO_HOST}:${exports.MONGO_PORT}`;
exports.POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
exports.POSTGRE_HOST = process.env.POSTGRES_HOST || 'postgres';
exports.POSTGRES_USER = process.env.POSTGRES_USER || 'superuser';
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '1234';
exports.PORT = process.env.PORT || 3000;
exports.MONGO_DB_NAME = 'recipe';
exports.POSTGRES_DB_NAME = 'recipe';
