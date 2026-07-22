import React from 'react';
import { Bot, User as UserIcon } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types/mentor.types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} my-2`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
          isUser ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-800 text-white shadow-xs'
        }`}
      >
        {isUser ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={isUser ? 'chat-bubble-user shadow-xs' : 'chat-bubble-ai shadow-xs'}>
        <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
        <div
          className={`mt-1.5 text-[10px] ${
            isUser ? 'text-blue-100 text-right' : 'text-slate-400'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
