"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO_CONNECT_URL = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL || "mongodb://localhost:27017";
exports.PORT = process.env.PORT || 3000;
