# Student AI Mentor — Production Frontend

An AI-powered academic performance, resume optimization, exam planning, and career guidance platform built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Axios**.

---

## 🚀 Key Modules & Features

1. **Authentication System (`/login`, `/register`)**
   - Split-screen auth UI with Zod & React Hook Form validation matching backend specs.
   - Secure JWT token storage & Axios Request/Response Interceptors.
   - Automatic 401/403 session expiration detection and redirect.

2. **Dashboard Layout & Navigation (`/dashboard`)**
   - Responsive layout with desktop collapsible sidebar, sticky header, notification drawer, profile modal, and mobile navigation drawer.

3. **LMS Analyzer (`/dashboard/lms`)**
   - Upload course Excel spreadsheets (`.xls`, `.xlsx`) to extract student grades.
   - Gemini-powered academic performance insights, statistics metric cards, and prompt-driven chat interface.

4. **Resume Analyzer (`/dashboard/resume`)**
   - PDF resume upload with drag-and-drop support.
   - Real-time ATS compatibility scoring, skill gap identification, formatting feedback, and project rewrite recommendations.

5. **Exam Planner (`/dashboard/exams`)**
   - Target exam schedule creator with subject & topic tag manager.
   - Interactive monthly calendar, countdown timer, daily study checklists, and weekly revision timeline.

6. **AI Mentor (`/dashboard/mentor`)**
   - 24/7 personal academic tutor with multi-session conversation history sidebar (search, pin, rename, delete).
   - Instant prompt suggestions, markdown response rendering, copy message, and learning progress insights.

7. **Internship Finder (`/dashboard/internships`)**
   - Multi-facet search and filter by Work Mode (*Remote, Hybrid, On-site*), Stipend Range, and Company Name.
   - Saved applications tracking list and detailed role drawer with direct application links.

8. **GitHub Analysis (`/dashboard/github`)**
   - Connect and sync public GitHub profiles and repository data.
   - Tech stack language distribution, commit activity timeline, repository breakdown, and AI portfolio recommendations.

---

## 🛠️ Technology Stack

- **Framework**: React 19, Vite 6
- **Language**: TypeScript 5
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **State & Data Fetching**: TanStack Query (React Query v5), Axios Client
- **Form Validation**: React Hook Form, Zod
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

---

## 📁 Project Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── api/             # Central Axios client with JWT interceptors
│   ├── components/      # Reusable UI components by feature module
│   │   ├── auth/
│   │   ├── exam/
│   │   ├── github/
│   │   ├── internship/
│   │   ├── layout/
│   │   ├── lms/
│   │   ├── mentor/
│   │   └── resume/
│   ├── contexts/        # AuthContext for session management
│   ├── hooks/           # Custom React hooks (useAuth, useFetch)
│   ├── layouts/         # AuthLayout, DashboardLayout
│   ├── pages/           # Page routes (Login, Register, LMS, Resume, Exams, etc.)
│   ├── router/          # React Router v7 configuration & ProtectedRoute
│   ├── services/        # Service layer API clients matching backend routes
│   ├── styles/          # Tailwind CSS styles and global theme design tokens
│   ├── types/           # TypeScript interface definitions
│   ├── utils/           # Helper utilities
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` in the `frontend` root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 💻 Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## 📦 Production Build & Verification

To test and compile the production bundle:

```bash
npm run build
```

This compiles TypeScript using `tsc -b` and builds minified production assets with Vite.

---

## 🔗 Backend Requirements

The frontend integrates directly with the Express/MongoDB backend server running at `http://localhost:5000/api`. Key route groups:
- `POST /api/auth/register` & `POST /api/auth/login`
- `POST /api/lms/upload` & `GET /api/lms/analyze`
- `POST /api/resume/upload` & `GET /api/resume/analyze`
- `POST /api/exams/create` & `GET /api/exams/plan`
- `POST /api/mentor` & `POST /api/daily-mentor/chat`
- `GET /api/internships/search` & `GET /api/internships`
- `GET /api/github` & `POST /api/github/sync`
