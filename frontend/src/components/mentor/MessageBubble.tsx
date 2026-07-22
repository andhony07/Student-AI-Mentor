import React, { useState } from 'react';
import { Bot, User as UserIcon, Copy, Check, RotateCcw } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types/mentor.types';
import toast from 'react-hot-toast';

interface MessageBubbleProps {
  message: ChatMessageType;
  onRegenerate?: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onRegenerate }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Message copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} my-2 group`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
          isUser ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-white shadow-xs'
        }`}
      >
        {isUser ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={`relative ${isUser ? 'chat-bubble-user shadow-xs' : 'chat-bubble-ai shadow-xs'}`}>
        <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>

        <div className="mt-2 flex items-center justify-between gap-4 border-t border-slate-100/20 pt-1 text-[10px]">
          <span className={isUser ? 'text-emerald-100' : 'text-slate-400'}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isUser ? 'hover:bg-emerald-700 text-emerald-100' : 'hover:bg-slate-100 text-slate-500'
              }`}
              title="Copy message"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
            {!isUser && onRegenerate && (
              <button
                onClick={onRegenerate}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                title="Regenerate response"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
