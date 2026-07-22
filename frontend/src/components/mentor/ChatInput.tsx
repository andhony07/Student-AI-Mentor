import React, { useState } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onStopGeneration?: () => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onStopGeneration,
  placeholder = 'Ask your AI Mentor a learning question...',
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await onSendMessage(text);
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3.5">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-hidden disabled:opacity-50"
        />

        {isLoading && onStopGeneration ? (
          <button
            type="button"
            onClick={onStopGeneration}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md hover:bg-amber-600 transition-all shrink-0 cursor-pointer"
            title="Stop generation"
          >
            <Square className="h-4 w-4 fill-white" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
