import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const defaultPrompts = [
  'Generate a study plan.',
  'How many hours should I study?',
  'Which subjects need more attention?',
  'Create a revision schedule.',
  "Help me prepare for tomorrow's exam.",
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="rounded-2xl bg-cyan-50 p-4 text-cyan-600 mb-3 shadow-xs">
        <Sparkles className="h-8 w-8 animate-bounce" />
      </div>
      <h4 className="font-bold text-slate-800 text-sm">Ask your Study AI Planner</h4>
      <p className="text-xs text-slate-500 max-w-xs mt-1 mb-5">
        Click any suggested query below to get customized timetable advice and revision techniques.
      </p>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        {defaultPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="w-full rounded-xl border border-cyan-200 bg-white px-3.5 py-2 text-xs font-medium text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300 transition-all text-left shadow-2xs flex items-center justify-between"
          >
            <span>{prompt}</span>
            <span className="text-cyan-400 text-xs font-bold">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
