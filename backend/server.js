import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './src/database/db.js';
import logger from './src/utils/logger.js';

// Uncaught Exceptions listener
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(`${err.name}: ${err.message}`, err.stack);
  process.exit(1);
});

// Load Env variables
dotenv.config();

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
