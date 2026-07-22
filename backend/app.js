import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './src/utils/errorHandler.js';
import { globalErrorHandler } from './src/middlewares/errorMiddleware.js';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import lmsRoutes from './src/routes/lmsRoutes.js';
import resumeRoutes from './src/routes/resumeRoutes.js';
import githubRoutes from './src/routes/githubRoutes.js';
import examRoutes from './src/routes/examRoutes.js';
import internshipRoutes from './src/routes/internshipRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import dailyMentorRoutes from './src/routes/dailyMentorRoutes.js';
import { protect } from './src/middlewares/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Enable CORS with safe origins
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

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
app.use('/api/auth', authRoutes);
app.use('/api/lms', protect, lmsRoutes);
app.use('/api/resume', protect, resumeRoutes);
app.use('/api/github', protect, githubRoutes);
app.use('/api/exams', protect, examRoutes);
app.use('/api/internships', protect, internshipRoutes);
app.use('/api/mentor', protect, aiRoutes);
app.use('/api/daily-mentor', protect, dailyMentorRoutes);

// Catch-all 404 Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Register Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
