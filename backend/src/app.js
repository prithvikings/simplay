import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import env from './config/env.js';
import routes from './routes/index.js';

import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

const app = express();

// --- Trust Proxy (IMPORTANT for deployment & rate limiting) ---
app.set('trust proxy', 1);

// --- Core Middleware ---
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// --- CORS ---
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// --- Logging ---
if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// --- Health Check ---
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// --- API Routes ---
app.use('/api', routes);

// --- 404 Handler (centralized, not inline) ---
app.use(notFound);

// --- Central Error Handler (LAST, always) ---
app.use(errorHandler);

export default app;
