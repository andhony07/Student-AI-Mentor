import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './src/utils/errorHandler.js';
import { globalErrorHandler } from './src/middlewares/errorMiddleware.js';

// Route imports
import lmsRoutes from './src/routes/lmsRoutes.js';
import resumeRoutes from './src/routes/resumeRoutes.js';
import githubRoutes from './src/routes/githubRoutes.js';
import examRoutes from './src/routes/examRoutes.js';
import internshipRoutes from './src/routes/internshipRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import dailyMentorRoutes from './src/routes/dailyMentorRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON and URL encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static upload assets
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// Status Endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Student AI Mentor API',
    status: 'Active',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
    timestamp: new Date()
  });
});

// Mount Routes
app.use('/api/lms', lmsRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/mentor', aiRoutes);
app.use('/api/daily-mentor', dailyMentorRoutes);

// Catch-all 404 Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Register Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
