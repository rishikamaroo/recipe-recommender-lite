/* Copyright (c) 2021 Rishika Maroo */

const dotenv = require('dotenv');
dotenv.config();

export const MONGO_PORT = process.env.MONGO_PORT || 27017;
export const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
export const MONGO_CONNECT_URL =
  process.env.MONGO_CONNECT_URL || `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

export const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
export const POSTGRE_HOST = process.env.POSTGRES_HOST || 'postgres';
export const POSTGRES_USER = process.env.POSTGRES_USER || 'superuser';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '1234';
export const PORT = process.env.PORT || 3000;
export const MONGO_DB_NAME = 'recipe';
export const POSTGRES_DB_NAME = 'recipe';
