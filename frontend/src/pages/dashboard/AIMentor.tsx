import React, { useState } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import ConversationList from '../../components/mentor/ConversationList';
import ChatWindow from '../../components/mentor/ChatWindow';
import InsightCard from '../../components/mentor/InsightCard';
import QuickActionCard from '../../components/mentor/QuickActionCard';
import MentorService, { type ConversationSession } from '../../services/mentor.service';
import type { ChatMessage } from '../../types/mentor.types';
import toast from 'react-hot-toast';

const initialSessions: ConversationSession[] = [
  {
    id: 'session-1',
    title: 'Data Structures & Algorithms Help',
    createdAt: new Date(),
    isPinned: true,
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Can you explain the difference between BFS and DFS graph traversals?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        role: 'assistant',
        content:
          'BFS (Breadth-First Search) uses a Queue and explores neighbors level-by-level.\nDFS (Depth-First Search) uses a Stack (or recursion) and explores as deep as possible before backtracking.',
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
  },
  {
    id: 'session-2',
    title: 'DBMS Normalization Notes',
    createdAt: new Date(),
    isPinned: false,
    messages: [
      {
        id: '3',
        role: 'user',
        content: 'What is 3NF in database normalization?',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '4',
        role: 'assistant',
        content:
          '3NF (Third Normal Form) requires that a relation is in 2NF and has no transitive functional dependencies. Non-prime attributes must depend solely on the candidate key.',
        timestamp: new Date(Date.now() - 86300000),
      },
    ],
  },
];

const AIMentor: React.FC = () => {
  const [sessions, setSessions] = useState<ConversationSession[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');
  const [isLoading, setIsLoading] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Create new session
  const handleNewChat = () => {
    const newSession = MentorService.createConversation(`Learning Chat #${sessions.length + 1}`);
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    toast.success('Started new AI Mentor chat session.');
  };

  // Delete session
  const handleDeleteSession = (id: string) => {
    const updated = MentorService.deleteConversation(id, sessions);
    setSessions(updated);
    if (activeSessionId === id && updated.length > 0) {
      setActiveSessionId(updated[0].id);
    }
    toast.success('Deleted conversation history.');
  };

  // Rename session
  const handleRenameSession = (id: string, newTitle: string) => {
    const updated = MentorService.renameConversation(id, newTitle, sessions);
    setSessions(updated);
    toast.success('Renamed conversation.');
  };

  // Send Message handler
  const handleSendMessage = async (text: string) => {
    if (!activeSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    // Append user message locally
    const updatedSessions = sessions.map((s) =>
      s.id === activeSessionId
        ? {
            ...s,
            title: s.messages.length === 0 ? text.slice(0, 25) + '...' : s.title,
            messages: [...s.messages, userMsg],
          }
        : s
    );
    setSessions(updatedSessions);
    setIsLoading(true);

    try {
      // Call primary backend endpoint POST /api/mentor
      const response = await MentorService.sendMessage(text);

      const aiResponseContent =
        response.data?.response ||
        response.message ||
        'AI Mentor responded to your question successfully.';

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, aiMsg] }
            : s
        )
      );
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'AI Mentor service unavailable.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate last AI response
  const handleRegenerate = async () => {
    if (!activeSession || activeSession.messages.length < 2) return;
    const lastUserMsg = [...activeSession.messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      await handleSendMessage(lastUserMsg.content);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="AI Mentor"
        description="Your personal AI learning assistant."
        icon={Bot}
        action={
          <button
            onClick={handleNewChat}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Reset Chat Session
          </button>
        }
      />

      {/* Main 3-Column Layout: Desktop / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Conversations History (3 cols) */}
        <div className="lg:col-span-3">
          <ConversationList
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewChat={handleNewChat}
            onRenameSession={handleRenameSession}
            onDeleteSession={handleDeleteSession}
          />
        </div>

        {/* Center Panel: Main AI Chat Interface (6 cols) */}
        <div className="lg:col-span-6">
          <ChatWindow
            messages={activeSession ? activeSession.messages : []}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onRegenerate={handleRegenerate}
            title={activeSession?.title || 'AI Mentor Chat'}
            subtitle="Personal Academic & Coding Tutor"
          />
        </div>

        {/* Right Panel: Insights & Quick Actions (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <InsightCard />
          <QuickActionCard />
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
