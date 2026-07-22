import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types/mentor.types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import PromptSuggestions from './PromptSuggestions';

interface ChatWindowProps {
  messages: ChatMessageType[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  title?: string;
  subtitle?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isLoading,
  title = 'GitHub AI Assistant',
  subtitle = 'Ask questions about your repositories & commit patterns',
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await onSendMessage(text);
  };

  return (
    <div className="flex h-[580px] flex-col rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm tracking-tight">{title}</h3>
            <p className="text-[11px] text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll bg-slate-50/30">
        {messages.length === 0 ? (
          <PromptSuggestions onSelectPrompt={(p) => onSendMessage(p)} />
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3.5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your GitHub query (e.g. Analyze my profile)..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-slate-900 focus:bg-white focus:outline-hidden disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md hover:bg-black disabled:opacity-50 transition-all shrink-0 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
