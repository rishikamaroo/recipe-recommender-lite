/* Copyright (c) 2021 Rishika Maroo */

const dotenv = require('dotenv');
dotenv.config();

export const MONGO_PORT = process.env.MONGO_PORT || 27017;
export const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
export const MONGO_CONNECT_URL =
  process.env.MONGO_CONNECT_URL || `mongodb://${MONGO_HOST}:${MONGO_PORT}`;
export const PORT = process.env.PORT || 3000;
export const MONGO_DB_NAME = 'recipe';
