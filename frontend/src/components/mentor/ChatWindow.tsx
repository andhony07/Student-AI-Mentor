import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types/mentor.types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import PromptSuggestions from './PromptSuggestions';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  messages: ChatMessageType[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onRegenerate?: () => void;
  onStopGeneration?: () => void;
  title?: string;
  subtitle?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onRegenerate,
  onStopGeneration,
  title = 'AI Mentor Assistant',
  subtitle = '24/7 Personal Academic & Technical Tutor',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex h-[580px] flex-col rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
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

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll bg-slate-50/30">
        {messages.length === 0 ? (
          <PromptSuggestions onSelectPrompt={(p) => onSendMessage(p)} />
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onRegenerate={onRegenerate} />
          ))
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        onStopGeneration={onStopGeneration}
      />
    </div>
  );
};

export default ChatWindow;
