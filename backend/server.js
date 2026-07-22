// MUST be the very first import — ES module `import` statements are
// statically hoisted and resolved before any code in this file executes.
// Importing env.js first guarantees dotenv.config() runs before any
// downstream module (e.g. gemini.js) reads process.env.
import './src/config/env.js';

import app from './app.js';
import { connectDB } from './src/database/db.js';
import logger from './src/utils/logger.js';

// Uncaught Exceptions listener
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(`${err.name}: ${err.message}`, err.stack);
  process.exit(1);
});

// Connect MongoDB database
connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Unhandled Promise Rejections listener
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(`${err.name}: ${err.message}`, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
