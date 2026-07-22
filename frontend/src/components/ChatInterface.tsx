import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import type { ChatMessage } from '../types/mentor.types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  placeholder?: string;
  suggestedQuestions?: string[];
  title?: string;
  subtitle?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  placeholder = 'Ask your AI mentor a question...',
  suggestedQuestions = [],
  title = 'AI Mentor Assistant',
  subtitle = 'Ask natural language questions about your data',
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

  const handleSuggestionClick = (question: string) => {
    onSendMessage(question);
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Online
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-scroll bg-slate-50/30">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center p-6">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 mb-3">
              <Sparkles className="h-8 w-8 animate-bounce" />
            </div>
            <h4 className="font-semibold text-slate-800 text-base">How can I guide you today?</h4>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-6">
              Ask any question to analyze insights, get study advice, or receive tailored feedback.
            </p>
            {suggestedQuestions.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(q)}
                    className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {msg.role === 'user' ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`${
                  msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai shadow-xs'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`mt-1 text-[10px] ${
                    msg.role === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="chat-bubble-ai flex items-center gap-2 py-3 px-4">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
                <span
                  className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                  className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></span>
              </div>
              <span className="text-xs text-slate-500 font-medium">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions pill row if messages exist */}
      {messages.length > 0 && suggestedQuestions.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-100 chat-scroll">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(q)}
              className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
