/* Copyright (c) 2021 Rishika Maroo */

const dotenv = require('dotenv');
dotenv.config();

/**
 * MONGO DB
 */
export const MONGO_PORT = process.env.MONGO_PORT || 27017;
export const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'recipe';
export const MONGO_CONNECT_URL =
  process.env.MONGO_CONNECT_URL || `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

/**
 * POSTGRES DB
 */
export const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '1234';
export const POSTGRES_DB_NAME = 'typeormdemo';
export const POSTGRES_CONNECT_URL =
  process.env.POSTGRES_CONNECT_URL ||
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}`;

/**
 * SERVER
 */
export const PORT = process.env.PORT || 3000;
