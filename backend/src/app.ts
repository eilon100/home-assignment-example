import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes';
import { NotFoundError } from './errors/not-found-error';

import { errorHandler } from './middleware/error-handler';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.static('public'));
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Request-Headers',
      'Access-Control-Request-Method',
      'Access-Control-Allow-Headers',
    ],
  })
);
app.use(cookieParser());

app.use('/', router);

app.use(errorHandler);

app.all('*', () => {
  throw new NotFoundError('Not Found');
});

export { app };
