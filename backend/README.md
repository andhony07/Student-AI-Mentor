# Student AI Mentor Backend

This is the production-ready modular backend for the **Student AI Mentor** application, built using Node.js, Express.js, and MongoDB.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [API Documentation](#api-documentation)
- [Future Roadmap](#future-roadmap)

## Tech Stack
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **AI Integration:** Gemini API via `@google/genai` (Placeholder)
- **Utilities:** Multer (File Upload), pdf-parse (PDF parsing), xlsx (Excel parsing), jsonwebtoken (Auth), bcryptjs (Password Hashing), Axios (HTTP requests), dotenv (Config), cors, uuid

## Folder Structure
```
backend/
├── src/
│   ├── config/          # SDK configuration (Gemini, Axios)
│   ├── controllers/     # Route controller logic
│   ├── database/        # DB connection module
│   ├── middlewares/     # Express route middlewares (auth, global error handler)
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic and external API communication layers
│   ├── utils/           # Shared utility tools (parsers, loggers, error wrappers)
│   ├── ai/              # AI specific assets (templates/helpers)
│   ├── prompts/         # Gemini prompt templates
│   └── uploads/         # Static uploads directory
│       ├── lms/
│       └── resumes/
├── .env                 # Local environment variables configuration
├── .env.example         # Template for environment variables
├── .gitignore           # File exclusion list
├── app.js               # Express application orchestration
├── package.json         # Package dependencies and task scripts
├── server.js            # Server entrypoint and runtime exception handling
└── README.md
```

## Installation

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root of the `backend/` directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_ai_mentor
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=your_github_token_here
JOB_API_KEY=your_job_api_key_here
```

## Scripts

- **Start in production mode:**
  ```bash
  npm start
  ```
- **Start in development mode with hot-reloading (nodemon):**
  ```bash
  npm run dev
  ```

## API Documentation

### Base & Status Endpoints
- `GET /` - Check server information.
- `GET /health` - System health check.

### Authentication Module
- `POST /api/auth/register` - Create user account. Returns JWT token and User info.
- `POST /api/auth/login` - Login to user account. Returns JWT token and User info.
- `GET /api/auth/me` - Get current authenticated user profile details. (Protected)

### LMS Progress Module
- `POST /api/lms/upload` - Upload academic/LMS report Excel sheet. Performs placeholder parsing. (Protected)
- `GET /api/lms/progress` - View processed/uploaded student academic progress report. (Protected)

### Resume Module
- `POST /api/resume/upload` - Upload PDF resume. Performs text parsing. (Protected)
- `POST /api/resume/analyze` - Request placeholder Gemini analysis for a specific resume. (Protected)

### Coding Progress Module
- `GET /api/coding` - Fetch combined coding platforms stats (LeetCode, Codeforces, HackerRank, College LMS Coding). (Protected)
- `POST /api/coding` - Update statistics for a coding platform. (Protected)

### GitHub Profile Module
- `GET /api/github` - Retrieve stored GitHub profile repository and user data. (Protected)
- `POST /api/github/sync` - Trigger a mock sync with the GitHub REST API. (Protected)

### Task Module
- `GET /api/tasks` - Get list of task checklist items. (Protected)
- `POST /api/tasks` - Create a new checklist item. (Protected)
- `PUT /api/tasks/:id` - Update status/details of a checklist item. (Protected)
- `DELETE /api/tasks/:id` - Delete a checklist item. (Protected)

### Exam Planner Module
- `GET /api/exams` - List scheduled academic exams. (Protected)
- `POST /api/exams` - Schedule a new academic exam. (Protected)
- `PUT /api/exams/:id` - Update scheduled exam details. (Protected)
- `DELETE /api/exams/:id` - Cancel/delete an exam event. (Protected)

### Internship Module
- `GET /api/internships` - List tracked job/internship applications. (Protected)
- `POST /api/internships` - Add an internship/job application record. (Protected)
- `GET /api/internships/search` - Search external positions using mock Jobs API. (Protected)

### AI Mentor Module
- `POST /api/mentor` - Chat/Ask questions to the Student AI Mentor (Gemini API). (Protected)

## Future Roadmap
1. Connect `@google/genai` to enable direct AI mentorship queries and ATS resume matching using Gemini models.
2. Integrate the GitHub REST API to pull real user commit data and repository statistics.
3. Hook up a real Jobs search API endpoint to load real-time internship opportunities.
4. Implement a background job processor (like BullMQ or Cron) to periodically synchronize GitHub activity and coding metrics.
