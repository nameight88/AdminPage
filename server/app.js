// server/app.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import generalRouter from './routers/general.js';
import authRouter    from './routers/auth.js';
import boxRouter     from './routers/box.js';
import historyRouter from './routers/history.js';
import emailRouter   from './routers/email.js';

import { SESSION_SECRET, isProd } from './config/env.js';
import { logger }                from './config/logger.js';

const app = express();
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) }}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { secure: isProd } }));

if (isProd) app.use(express.static('../dist'));

app.use('/api',      generalRouter);
app.use('/api/auth', authRouter);
app.use('/api/box',  boxRouter);
app.use('/api/history', historyRouter);
app.use('/api/email',   emailRouter);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
