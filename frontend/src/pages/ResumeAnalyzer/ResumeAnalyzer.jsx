import { useState } from 'react';
import { HiDocumentText, HiUpload, HiChat } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { resumeService } from '../../services/resumeService';
import FileUpload from '../../components/Inputs/FileUpload';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import ChatInterface from '../../components/Chat/ChatInterface';

const ResumeAnalyzer = () => {
  const [tab, setTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
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
      setTab('chat');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
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
    { id: 'chat', label: 'Chat', icon: HiChat },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <HiDocumentText className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Assistant</h1>
            <p className="text-sm text-slate-500 mt-1">Upload your resume and ask the AI anything to improve it</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
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
              Upload & Chat
            </PrimaryButton>
          </div>
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
