import http from 'http';
import mongoose from 'mongoose';

import app from './src/app.js';
import env from './src/config/env.js';
import { connectDB } from './src/config/db.js';

const server = http.createServer(app);

// --- Bootstrap Server ---
const startServer = async () => {
  try {
    await connectDB();

    server.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();

// --- Graceful Shutdown ---
const shutdown = async (signal) => {
  console.log(`🛑 ${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    await mongoose.connection.close(false);
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });

  // Force exit if shutdown hangs
  setTimeout(() => {
    console.error('❌ Forced shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// --- Crash on Fatal Errors ---
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});
