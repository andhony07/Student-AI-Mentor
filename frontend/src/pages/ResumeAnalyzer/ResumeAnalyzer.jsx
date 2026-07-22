import { useState } from 'react';
import { HiDocumentText, HiUpload, HiChartBar, HiChat } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { resumeService } from '../../services/resumeService';
import FileUpload from '../../components/Inputs/FileUpload';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import ChatInterface from '../../components/Chat/ChatInterface';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';

const ResumeAnalyzer = () => {
  const [tab, setTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a PDF file');
    try {
      setUploading(true);
      const res = await resumeService.upload(file);
      const data = res.data;
      if (data.duplicate) {
        toast(data.message || 'Resume already uploaded.', { icon: 'ℹ️' });
      } else {
        toast.success(data.message || 'Resume uploaded successfully!');
      }
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
      const { data } = await resumeService.analyze();
      setAnalysis(data?.data || data);
    } catch (err) {
      setAnalysis(null);
      if (err.response?.status !== 404) {
        toast.error(err.response?.data?.message || 'Failed to analyze resume');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleChat = async (question) => {
    setChatMessages((prev) => [...prev, { role: 'user', content: question }]);
    try {
      setChatLoading(true);
      const { data } = await resumeService.chat(question);
      setChatMessages((prev) => [...prev, { role: 'assistant', content: data?.answer || data?.data?.answer }]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Chat failed');
    } finally {
      setChatLoading(false);
    }
  };

  const tabs = [
    { id: 'upload', label: 'Upload', icon: HiUpload },
    { id: 'analysis', label: 'Analysis', icon: HiChartBar },
    { id: 'chat', label: 'Chat', icon: HiChat },
  ];

  const renderScore = (score) => {
    const color = score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-rose-500';
    return <span className={`text-6xl font-black ${color}`}>{score}</span>;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <HiDocumentText className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Analyzer</h1>
            <p className="text-sm text-slate-500 mt-1">AI-powered resume analysis and ATS scoring</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              if (t.id === 'analysis' && !analysis) handleAnalyze();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* Upload Tab */}
      {tab === 'upload' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <FileUpload accept=".pdf" onFileSelect={setFile} label="Upload Resume" description="Only PDF files accepted" />
          <div className="mt-6 flex justify-end">
            <PrimaryButton onClick={handleUpload} loading={uploading} icon={HiUpload}>
              Upload & Analyze
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {tab === 'analysis' && (
        <div>
          {analyzing ? (
            <Loader text="Analyzing your resume with AI..." />
          ) : analysis ? (
            <div className="space-y-6">
              {/* Score */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-4 -mt-4" />
                <div className="relative z-10">
                  <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">Overall Resume Score</p>
                  {renderScore(analysis.overallScore ?? analysis.score ?? 0)}
                  <p className="text-sm font-medium text-slate-400 mt-2">out of 100</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ATS Score */}
                {(analysis.atsScore || analysis.atsCompatibility) && (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🤖</span> ATS Compatibility
                    </h3>
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mb-3">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${analysis.atsScore || analysis.atsCompatibility || 0}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-600 text-right">{analysis.atsScore || analysis.atsCompatibility || 0}% Match</p>
                  </div>
                )}

                {/* Skills */}
                {analysis.skills && (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Skills Found
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(analysis.skills) ? analysis.skills : []).map((s, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 rounded-lg"
                        >
                          {typeof s === 'string' ? s : s.name || s.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {analysis.strengths && (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">✅</span> Strengths
                    </h3>
                    <ul className="space-y-3">
                      {(Array.isArray(analysis.strengths) ? analysis.strengths : []).map((s, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-3 bg-emerald-50/50 p-3 rounded-xl">
                          <span className="text-emerald-500 font-bold">•</span> 
                          <span>{typeof s === 'string' ? s : s.point || s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {analysis.weaknesses && (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚠️</span> Areas to Improve
                    </h3>
                    <ul className="space-y-3">
                      {(Array.isArray(analysis.weaknesses) ? analysis.weaknesses : []).map((s, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-3 bg-amber-50/50 p-3 rounded-xl">
                          <span className="text-amber-500 font-bold">•</span> 
                          <span>{typeof s === 'string' ? s : s.point || s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {analysis.suggestions && (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span> Recommendations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(Array.isArray(analysis.suggestions) ? analysis.suggestions : []).map((s, i) => (
                      <div key={i} className="text-sm text-slate-600 flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                        <span className="text-blue-500 font-bold">{i + 1}.</span> 
                        <span>{typeof s === 'string' ? s : s.suggestion || s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <EmptyState
                icon={HiDocumentText}
                title="No Resume Uploaded"
                description="Upload your resume to start analysis."
                action={
                  <PrimaryButton onClick={() => setTab('upload')} icon={HiUpload}>
                    Upload Resume
                  </PrimaryButton>
                }
              />
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
            placeholder="Ask about your resume..."
            suggestedQuestions={['How can I improve my resume?', 'Is my resume ATS-friendly?', 'What skills should I add?']}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
