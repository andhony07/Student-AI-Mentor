import React, { useState, useEffect, useCallback } from 'react';
import { FileText, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import ResumeUploader from '../../components/resume/ResumeUploader';
import ChatWindow from '../../components/resume/ChatWindow';
import ResumeScoreCard from '../../components/resume/ResumeScoreCard';
import SkillAnalysisCard from '../../components/resume/SkillAnalysisCard';
import RecommendationCard from '../../components/resume/RecommendationCard';
import ResumeSummaryCard from '../../components/resume/ResumeSummaryCard';
import ResumeService from '../../services/resume.service';
import type { ChatMessage } from '../../types/mentor.types';
import toast from 'react-hot-toast';

const ResumeAnalyzer: React.FC = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [analysis, setAnalysis] = useState<Record<string, unknown> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  // Fetch AI analysis report for latest resume
  const fetchAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const res = await ResumeService.analyzeResume();
      if (res) {
        setAnalysis(res as Record<string, unknown>);
      }
    } catch {
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  // Handle PDF file upload
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const res = await ResumeService.uploadResume(file);
      setUploadedFileName(file.name);
      toast.success(res.message || 'Resume PDF uploaded and parsed successfully!');
      // Re-trigger analysis after upload
      await fetchAnalysis();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Failed to upload PDF resume';
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove current resume state
  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setAnalysis(null);
    toast.success('Cleared selected resume file.');
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
      const res = await ResumeService.chat({ question });
      const aiAnswer = res.answer || 'No response generated.';
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
        'Please upload your PDF resume first before asking questions.';
      toast.error(msg);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Resume Analyzer"
        description="Upload your resume and receive AI-powered feedback and career recommendations."
        icon={FileText}
        action={
          <button
            onClick={fetchAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} /> Refresh Analysis
          </button>
        }
      />

      {/* Score Overview */}
      <ResumeScoreCard />

      {/* Main Layout: Desktop 2-Columns / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Upload, Skills, Recommendations & Summary (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-4">PDF Resume Upload</h3>
            <ResumeUploader
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
              uploadedFileName={uploadedFileName}
              onRemoveFile={handleRemoveFile}
            />
          </div>

          <SkillAnalysisCard />
          <RecommendationCard />
          <ResumeSummaryCard analysis={analysis} isLoading={isAnalyzing} />
        </div>

        {/* Right Panel: AI Chat Window (5 cols) */}
        <div className="lg:col-span-5">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isChatting}
            title="Resume AI Assistant"
            subtitle="Ask specific ATS, formatting, or project rewrite questions"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
