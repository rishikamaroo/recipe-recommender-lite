/* Copyright (c) 2021 Rishika Maroo */

import cors from 'cors';
import express from 'express';
import recipeRoutes from './routes/recipe';
import userRoutes from './routes/user';
import { json } from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import { HTTPStatusCode } from './constants';
import { Logger } from './utils/logger';
import { MONGO_CONNECT_URL, MONGO_DB_NAME, PORT, TYPEORM_CONFIG } from './config';
import { errorHandler } from './middleware/errorHandler';
import { ConnectionOptions, createConnection } from 'typeorm';

export const connection = createConnection(TYPEORM_CONFIG as ConnectionOptions);

/**
 * Initializes db connections
 */
async function initDb(): Promise<void> {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {});

  mongoose.connect(
    `${MONGO_CONNECT_URL}/${MONGO_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
    () => {
      logger.info('*** Connected to mongo database.');
    },
  );
  mongoose.set('useFindAndModify', false);
}

/**
 * Creates app
 */
async function createApp() {
  await initDb();
  const app = express();
  app.use(cors());
  app.use(json());
  app.use('/api/v1/recipe', recipeRoutes);
  app.use('/api/v1/user', userRoutes);
  app.use(errorHandler as express.ErrorRequestHandler);
  app.get('/', (_req, res, _next) => {
    return res.status(HTTPStatusCode.OK).json({
      status: 'ok',
      version: '1.0.0',
    });
  });
  app.listen(PORT, () => {
    logger.info(`*** Server listening to port: ${PORT}...`);
  });

  // (TODO) add application level middleware, ex:
  // app.use(diagnosticsMiddleware)
  // app.use(datadogClientMiddleware)

  // (TODO) add sub-stack level middleware, ex:
  // app.get('/status/sla', statusMiddleware)
}

createApp();
const logger = new Logger();
