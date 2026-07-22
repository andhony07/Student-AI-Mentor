import React, { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import type { CreateExamPayload, ExamSubject } from '../../types/exam.types';
import toast from 'react-hot-toast';

interface ExamFormProps {
  onSubmitExam: (payload: CreateExamPayload) => Promise<void>;
  isSubmitting: boolean;
}

interface SubjectState {
  subject: string;
  topics: string[];
  topicText: string;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmitExam, isSubmitting }) => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('09:00');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [targetScore, setTargetScore] = useState<number>(90);
  const [dailyStudyHours, setDailyStudyHours] = useState<number>(4);
  const [notes, setNotes] = useState('');

  const [subjects, setSubjects] = useState<SubjectState[]>([
    {
      subject: 'Data Structures & Algorithms',
      topics: ['Trees & Graphs', 'Dynamic Programming', 'Sorting'],
      topicText: '',
    },
  ]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: '', topics: [], topicText: '' }]);
  };

  const handleRemoveSubject = (index: number) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleAddTopic = (subIndex: number) => {
    const text = subjects[subIndex].topicText.trim();
    if (!text) return;
    const updated = [...subjects];
    updated[subIndex].topics.push(text);
    updated[subIndex].topicText = '';
    setSubjects(updated);
  };

  const handleRemoveTopic = (subIndex: number, topicIndex: number) => {
    const updated = [...subjects];
    updated[subIndex].topics.splice(topicIndex, 1);
    setSubjects(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examName.trim()) {
      toast.error('Exam name is required.');
      return;
    }

    if (!examDate) {
      toast.error('Exam date is required.');
      return;
    }

    const parsed = new Date(examDate);
    if (isNaN(parsed.getTime())) {
      toast.error('Invalid exam date.');
      return;
    }

    if (parsed < new Date(new Date().setHours(0, 0, 0, 0))) {
      toast.error('Exam date cannot be in the past.');
      return;
    }

    if (dailyStudyHours < 1 || dailyStudyHours > 12) {
      toast.error('Daily study hours must be between 1 and 12.');
      return;
    }

    const validSubjects: ExamSubject[] = subjects
      .map((s) => ({
        subject: s.subject.trim(),
        topics: s.topics,
      }))
      .filter((s) => s.subject && s.topics.length > 0);

    if (validSubjects.length === 0) {
      toast.error('At least one subject with at least one topic is required.');
      return;
    }

    await onSubmitExam({
      examName: examName.trim(),
      examDate,
      dailyStudyHours: Number(dailyStudyHours),
      subjects: validSubjects,
    });

    // Reset form after creation
    setExamName('');
    setExamDate('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Exam Name *</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="e.g. Mid-Term Algorithms Exam"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-cyan-600 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Exam Target Date *</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-cyan-600 focus:outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Exam Time</label>
          <input
            type="time"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-cyan-600"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-cyan-600"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Target Score (%)</label>
          <input
            type="number"
            min="50"
            max="100"
            value={targetScore}
            onChange={(e) => setTargetScore(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-cyan-600"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="font-semibold text-slate-700">
            Daily Study Commitment: <span className="text-cyan-600 font-bold">{dailyStudyHours} Hours/Day</span>
          </label>
          <span className="text-[10px] text-slate-400">Min 1h — Max 12h</span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          value={dailyStudyHours}
          onChange={(e) => setDailyStudyHours(Number(e.target.value))}
          className="w-full accent-cyan-600 cursor-pointer"
        />
      </div>

      {/* Subjects & Topics Manager */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-slate-700">Subjects & Topic Breakdown *</label>
          <button
            type="button"
            onClick={handleAddSubject}
            className="flex items-center gap-1 text-xs text-cyan-600 font-bold hover:underline cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Subject
          </button>
        </div>

        {subjects.map((sub, sIdx) => (
          <div key={sIdx} className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={sub.subject}
                onChange={(e) => {
                  const updated = [...subjects];
                  updated[sIdx].subject = e.target.value;
                  setSubjects(updated);
                }}
                placeholder="Subject Title (e.g. Operating Systems)"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-cyan-600"
              />
              {subjects.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(sIdx)}
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {sub.topics.map((top, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-flex items-center gap-1 rounded-full bg-cyan-100 text-cyan-800 px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {top}
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(sIdx, tIdx)}
                    className="hover:text-red-600 cursor-pointer ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={sub.topicText}
                onChange={(e) => {
                  const updated = [...subjects];
                  updated[sIdx].topicText = e.target.value;
                  setSubjects(updated);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTopic(sIdx);
                  }
                }}
                placeholder="Add topic tag (press Enter)"
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-700"
              />
              <button
                type="button"
                onClick={() => handleAddTopic(sIdx)}
                className="rounded-lg bg-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-300 cursor-pointer"
              >
                Add Tag
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">Additional Notes / Syllabus Links</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Exam venue, calculator requirements, key reference textbook chapters..."
          rows={2}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-cyan-600"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-xs font-bold text-white hover:bg-cyan-700 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
      >
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Generate AI Study Schedule
          </>
        )}
      </button>
    </form>
  );
};

export default ExamForm;
