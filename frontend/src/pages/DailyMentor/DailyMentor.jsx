import { useState } from 'react';
import { HiChat } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { mentorService } from '../../services/mentorService';
import ChatInterface from '../../components/Chat/ChatInterface';

const DailyMentor = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const handleSend = async (question) => {
    const userMsg = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await mentorService.dailyChat(question, conversationId);
      const data = res.data?.data || res.data;
      if (data?.conversationId) {
        setConversationId(data.conversationId);
      }
      const assistantMsg = {
        role: 'assistant',
        content: data?.answer || 'I am sorry, I could not process that request.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to get mentor response');
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    'How should I prepare for upcoming technical interviews?',
    'What skills are most in-demand for web development?',
    'How can I structure my daily study routine efficiently?',
    'Can you guide me on creating a strong portfolio project?',
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <HiChat className="w-7 h-7 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daily AI Mentor</h1>
          <p className="text-sm text-slate-500 mt-1">
            Context-aware academic and career mentorship powered by AI
          </p>
        </div>
      </div>

      <div className="h-[650px]">
        <ChatInterface
          messages={messages}
          onSend={handleSend}
          loading={loading}
          placeholder="Ask your mentor anything about studies, career, or preparation..."
          suggestedQuestions={suggestedQuestions}
        />
      </div>
    </div>
  );
};

export default DailyMentor;
