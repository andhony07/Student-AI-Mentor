import { useState } from 'react';
import { HiAcademicCap, HiUpload, HiChat } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { lmsService } from '../../services/lmsService';
import FileUpload from '../../components/Inputs/FileUpload';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import ChatInterface from '../../components/Chat/ChatInterface';

const LMSAnalyzer = () => {
  const [tab, setTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error('Please select an Excel (.xlsx) file');
    try {
      setUploading(true);
      await lmsService.upload(file);
      toast.success('LMS Excel file uploaded successfully!');
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
          <HiAcademicCap className="w-7 h-7 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">LMS Assistant</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload LMS Excel files and chat with AI about your academic performance
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
          onClick={() => setTab('chat')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'chat'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HiChat className="w-4 h-4" /> Performance Chat
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
