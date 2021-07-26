"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO_CONNECT_URL = exports.MONGO_HOST = exports.MONGO_PORT = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.MONGO_PORT = process.env.MONGO_PORT || 27017;
exports.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
exports.MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL || `mongodb://${exports.MONGO_HOST}:${exports.MONGO_PORT}`;
exports.PORT = process.env.PORT || 3000;
