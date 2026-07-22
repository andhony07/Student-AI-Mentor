import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 my-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
        <Bot className="h-4 w-4" />
      </div>
      <div className="chat-bubble-ai flex items-center gap-2 py-3 px-4 shadow-xs">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-600 animate-bounce" />
          <span
            className="h-2 w-2 rounded-full bg-slate-600 animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className="h-2 w-2 rounded-full bg-slate-600 animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">Analyzing GitHub Profile...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
