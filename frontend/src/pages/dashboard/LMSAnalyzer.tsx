import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import ExcelUploader from '../../components/lms/ExcelUploader';
import ChatWindow from '../../components/lms/ChatWindow';
import StatisticsCard from '../../components/lms/StatisticsCard';
import InsightsCard from '../../components/lms/InsightsCard';
import AnalysisSummary from '../../components/lms/AnalysisSummary';
import LMSService from '../../services/lms.service';
import type { ChatMessage } from '../../types/mentor.types';
import toast from 'react-hot-toast';

const LMSAnalyzer: React.FC = () => {
  // State management
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [recordsInserted, setRecordsInserted] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [analysisData, setAnalysisData] = useState<Record<string, unknown> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  // Fetch analysis report from backend
  const fetchAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const res = await LMSService.analyze();
      if (res.data) {
        setAnalysisData(res.data);
      }
    } catch {
      // 404 if no data uploaded yet
      setAnalysisData(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  // Handle Excel upload
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const res = await LMSService.uploadExcel(file);
      setUploadedFileName(file.name);
      setRecordsInserted(res.recordsInserted);
      toast.success(
        res.message || `LMS Excel parsed successfully (${res.recordsInserted} records)`
      );
      // Automatically refresh AI analysis after upload
      await fetchAnalysis();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Failed to upload LMS Excel file';
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded file state
  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setRecordsInserted(null);
    setAnalysisData(null);
    toast.success('Removed current file state.');
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
      const res = await LMSService.chat({ question });
      const aiAnswer = res.data?.answer || 'No response generated.';
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
        'Please upload your LMS Excel file before querying the chat.';
      toast.error(msg);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="LMS Analyzer"
        description="Upload your LMS Excel file and receive AI-powered insights."
        icon={BarChart3}
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

      {/* Statistics Metric Bar */}
      <StatisticsCard />

      {/* Main Grid: Desktop 2 Columns / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Excel Uploader, Analysis Summary & Insights (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-4">LMS Excel Spreadsheet Upload</h3>
            <ExcelUploader
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
              uploadedFileName={uploadedFileName}
              recordsInserted={recordsInserted}
              onRemoveFile={handleRemoveFile}
            />
          </div>

          <InsightsCard />
          <AnalysisSummary data={analysisData} isLoading={isAnalyzing} />
        </div>

        {/* Right Panel: AI Chat Window (5 cols) */}
        <div className="lg:col-span-5">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isChatting}
            title="LMS AI Chat Assistant"
            subtitle="Ask questions about your uploaded LMS spreadsheet"
          />
        </div>
      </div>
    </div>
  );
};

export default LMSAnalyzer;
