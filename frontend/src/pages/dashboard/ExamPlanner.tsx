import React, { useState, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, RefreshCw, Plus, BookOpen } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import ExamForm from '../../components/exam/ExamForm';
import ExamCard from '../../components/exam/ExamCard';
import CalendarView from '../../components/exam/CalendarView';
import CountdownCard from '../../components/exam/CountdownCard';
import DailyTaskCard from '../../components/exam/DailyTaskCard';
import RevisionTimeline from '../../components/exam/RevisionTimeline';
import StudyPlanCard from '../../components/exam/StudyPlanCard';
import ChatWindow from '../../components/exam/ChatWindow';
import ExamService from '../../services/exam.service';
import type { CreateExamPayload, ExamSubject } from '../../types/exam.types';
import type { ChatMessage } from '../../types/mentor.types';
import toast from 'react-hot-toast';

interface LocalExamItem {
  id: string;
  examName: string;
  examDate: string;
  dailyStudyHours: number;
  subjects: ExamSubject[];
  priority: 'High' | 'Medium' | 'Low';
}

const ExamPlanner: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [studyPlan, setStudyPlan] = useState<Record<string, unknown> | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  const [exams, setExams] = useState<LocalExamItem[]>([
    {
      id: '1',
      examName: 'DBMS & Algorithms Midterm',
      examDate: '2026-07-30',
      dailyStudyHours: 4,
      priority: 'High',
      subjects: [
        { subject: 'Database Systems', topics: ['Normalization', 'SQL Transactions', 'B+ Trees'] },
        { subject: 'Data Structures', topics: ['Graphs & BFS/DFS', 'Dynamic Programming'] },
      ],
    },
  ]);

  // Fetch study plan from backend
  const fetchPlan = useCallback(async () => {
    setIsLoadingPlan(true);
    try {
      const data = await ExamService.getPlan();
      if (data) {
        setStudyPlan(data as Record<string, unknown>);
      }
    } catch {
      setStudyPlan(null);
    } finally {
      setIsLoadingPlan(false);
    }
  }, []);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  // Create new exam & generate AI schedule
  const handleCreateExam = async (payload: CreateExamPayload) => {
    setIsSubmitting(true);
    try {
      const res = await ExamService.createExam(payload);
      toast.success(res.message || 'Exam & AI Study Schedule created successfully!');

      const newLocal: LocalExamItem = {
        id: Date.now().toString(),
        examName: payload.examName,
        examDate: payload.examDate,
        dailyStudyHours: payload.dailyStudyHours,
        subjects: payload.subjects,
        priority: 'High',
      };
      setExams([newLocal, ...exams]);
      setShowCreateForm(false);
      await fetchPlan();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Failed to create exam plan';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExam = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
    toast.success('Exam removed from local list.');
  };

  // Handle AI Chat query
  const handleSendMessage = async (question: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsChatting(true);

    try {
      const res = await ExamService.chat({ question });
      const aiAnswer = res.answer || 'No study guidance generated.';
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiAnswer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Please generate a study plan first before querying the AI planner.';
      toast.error(msg);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Exam Planner"
        description="Plan your exams, study schedule, and receive AI-powered preparation guidance."
        icon={CalendarIcon}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> {showCreateForm ? 'Close Form' : 'New Exam Plan'}
            </button>
            <button
              onClick={fetchPlan}
              disabled={isLoadingPlan}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`h-4 w-4 ${isLoadingPlan ? 'animate-spin' : ''}`} /> Refresh Plan
            </button>
          </div>
        }
      />

      {/* Countdown Hero Banner */}
      <CountdownCard
        examName={exams[0]?.examName}
        examDate={exams[0]?.examDate}
      />

      {/* Main Grid: Desktop 2 Columns / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Exam Form, Cards, Calendar, Tasks & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Create Exam Form Modal / Card */}
          {showCreateForm && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs animate-in fade-in slide-in-from-top-2">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-cyan-600" /> Create Exam & Study Schedule
              </h3>
              <ExamForm onSubmitExam={handleCreateExam} isSubmitting={isSubmitting} />
            </div>
          )}

          {/* Exam Cards List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Target Exams ({exams.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exams.map((ex) => (
                <ExamCard
                  key={ex.id}
                  id={ex.id}
                  examName={ex.examName}
                  examDate={ex.examDate}
                  dailyStudyHours={ex.dailyStudyHours}
                  subjects={ex.subjects}
                  priority={ex.priority}
                  onDelete={() => handleDeleteExam(ex.id)}
                />
              ))}
            </div>
          </div>

          <CalendarView />
          <DailyTaskCard />
          <RevisionTimeline />
          <StudyPlanCard planData={studyPlan} isLoading={isLoadingPlan} />
        </div>

        {/* Right Panel: AI Study Planner Chat (5 cols) */}
        <div className="lg:col-span-5">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isChatting}
            title="AI Study Planner Assistant"
            subtitle="Ask questions about your study timetable and deadlines"
          />
        </div>
      </div>
    </div>
  );
};

export default ExamPlanner;
