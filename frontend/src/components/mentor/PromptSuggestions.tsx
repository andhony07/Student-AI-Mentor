import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const defaultPrompts = [
  'Explain this topic.',
  'Create quiz questions.',
  'Generate revision notes.',
  'Help me debug code.',
  'Teach me Python.',
  'Explain DBMS.',
  'Prepare for interview.',
  'Generate study roadmap.',
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-600 mb-3 shadow-xs">
        <Sparkles className="h-8 w-8 animate-bounce" />
      </div>
      <h4 className="font-bold text-slate-800 text-sm">How can your AI Mentor guide you?</h4>
      <p className="text-xs text-slate-500 max-w-xs mt-1 mb-5">
        Click any topic prompt below to launch an instant AI tutoring session.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
        {defaultPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="w-full rounded-xl border border-emerald-200 bg-white px-3.5 py-2 text-xs font-medium text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left shadow-2xs flex items-center justify-between"
          >
            <span className="truncate">{prompt}</span>
            <span className="text-emerald-500 text-xs font-bold shrink-0 ml-1">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
