import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const defaultPrompts = [
  'Analyze my weak subjects.',
  'Which topics need improvement?',
  "Generate today's study plan.",
  'Predict my exam readiness.',
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 mb-3 shadow-xs">
        <Sparkles className="h-8 w-8 animate-bounce" />
      </div>
      <h4 className="font-bold text-slate-800 text-sm">Ask your LMS AI Mentor</h4>
      <p className="text-xs text-slate-500 max-w-xs mt-1 mb-5">
        Click any suggested prompt below or type a natural language question about your LMS Excel grades.
      </p>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        {defaultPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="w-full rounded-xl border border-blue-200 bg-white px-3.5 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all text-left shadow-2xs flex items-center justify-between"
          >
            <span>{prompt}</span>
            <span className="text-blue-400 text-xs font-bold">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
