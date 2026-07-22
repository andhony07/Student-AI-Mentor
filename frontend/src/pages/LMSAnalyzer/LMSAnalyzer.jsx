import { useState } from 'react';
import { HiAcademicCap, HiUpload, HiChartBar, HiChat } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { lmsService } from '../../services/lmsService';
import FileUpload from '../../components/Inputs/FileUpload';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import ChatInterface from '../../components/Chat/ChatInterface';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LMSAnalyzer = () => {
  const [tab, setTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error('Please select an Excel (.xlsx) file');
    try {
      setUploading(true);
      await lmsService.upload(file);
      toast.success('LMS Excel file uploaded successfully!');
      setFile(null);
      setTab('analysis');
      handleAnalyze();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      const res = await lmsService.analyze();
      setAnalysis(res.data?.data || res.data);
    } catch (err) {
      setAnalysis(null);
      if (err.response?.status !== 404) {
        toast.error(err.response?.data?.message || 'Failed to analyze LMS data');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleChat = async (question) => {
    setChatMessages((prev) => [...prev, { role: 'user', content: question }]);
    setChatLoading(true);
    try {
      const res = await lmsService.chat(question);
      const answer = res.data?.answer || res.data?.data?.answer || 'No response';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Chat failed');
    } finally {
      setChatLoading(false);
    }
  };

  const chartData = analysis?.courses
    ? analysis.courses.map((c) => ({
        name: (c.course || c.subject || 'Course').substring(0, 10),
        completion: c.completion ?? 0,
        quiz: c.quizScore ?? c.quiz ?? 0,
        assignment: c.assignmentScore ?? c.assignment ?? 0,
      }))
    : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
          <HiAcademicCap className="w-7 h-7 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">LMS Analyzer</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload LMS Excel files and receive AI-driven performance analytics
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
        <button
          onClick={() => setTab('upload')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'upload'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HiUpload className="w-4 h-4" /> Upload Data
        </button>
        <button
          onClick={() => {
            setTab('analysis');
            if (!analysis) handleAnalyze();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'analysis'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HiChartBar className="w-4 h-4" /> Analytics
        </button>
        <button
          onClick={() => setTab('chat')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'chat'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HiChat className="w-4 h-4" /> LMS Assistant
        </button>
      </div>

      {/* Upload Tab */}
      {tab === 'upload' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <FileUpload
            accept=".xlsx"
            onFileSelect={setFile}
            label="Upload LMS Excel File"
            description="Upload .xlsx file containing course completion, quiz, assignment, and attendance data."
            maxSize="10MB"
          />
          <div className="mt-6 flex justify-end">
            <PrimaryButton onClick={handleUpload} loading={uploading} icon={HiUpload}>
              Upload & Analyze
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {tab === 'analysis' && (
        <div>
          {analyzing ? (
            <Loader text="Generating LMS insights with AI..." />
          ) : !analysis ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <EmptyState
                icon={HiAcademicCap}
                title="No LMS Data Found"
                description="Upload your LMS Excel file to view insights."
                action={
                  <PrimaryButton onClick={() => setTab('upload')} icon={HiUpload}>
                    Upload LMS File
                  </PrimaryButton>
                }
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4" />
                  <p className="text-sm font-medium text-slate-500 relative z-10">Total Courses</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2 relative z-10">
                    {analysis.totalCourses ?? chartData.length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4" />
                  <p className="text-sm font-medium text-slate-500 relative z-10">Avg Completion</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-2 relative z-10">
                    {analysis.averageCompletion ?? '--'}%
                  </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4" />
                  <p className="text-sm font-medium text-slate-500 relative z-10">Avg Quiz Score</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2 relative z-10">
                    {analysis.averageQuizScore ?? '--'}%
                  </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-bl-full -mr-4 -mt-4" />
                  <p className="text-sm font-medium text-slate-500 relative z-10">Avg Assignment</p>
                  <p className="text-3xl font-bold text-violet-600 mt-2 relative z-10">
                    {analysis.averageAssignmentScore ?? '--'}%
                  </p>
                </div>
              </div>

              {/* Performance Chart */}
              {chartData.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Course Performance Comparison
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} dx={-10} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="completion" fill="#3b82f6" name="Completion %" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="quiz" fill="#10b981" name="Quiz Score %" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="assignment" fill="#8b5cf6" name="Assignment %" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Insights */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span> AI Academic Insights
                </h3>
                <div className="markdown-body text-slate-700">
                  {typeof analysis.insights === 'string' ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {analysis.insights}
                    </ReactMarkdown>
                  ) : Array.isArray(analysis.insights) ? (
                    <ul className="space-y-3">
                      {analysis.insights.map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : typeof analysis === 'string' ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {analysis}
                    </ReactMarkdown>
                  ) : (
                    <pre className="p-4 bg-slate-50 rounded-xl text-sm overflow-x-auto text-slate-800 border border-slate-200">
                      {JSON.stringify(analysis, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Tab */}
      {tab === 'chat' && (
        <div className="h-[650px]">
          <ChatInterface
            messages={chatMessages}
            onSend={handleChat}
            loading={chatLoading}
            placeholder="Ask questions about your LMS grades or attendance..."
            suggestedQuestions={[
              'Which subject has my lowest completion rate?',
              'How can I improve my quiz performance?',
              'Summarize my academic standing across all modules.',
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default LMSAnalyzer;
