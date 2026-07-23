import { useState, useEffect } from 'react';
import { HiCalendar, HiPlus, HiTrash } from 'react-icons/hi';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { examService } from '../../services/examService';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import ChatInterface from '../../components/Chat/ChatInterface';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import Modal from '../../components/Modal/Modal';

const ExamPlanner = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      examName: '',
      examDate: '',
      dailyStudyHours: 4,
      subjects: [{ subject: '', topics: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects',
  });

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await examService.getPlan();
      setPlan(res.data?.data || res.data);
    } catch {
      setPlan(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const onCreateExam = async (data) => {
    try {
      setCreating(true);
      const formattedSubjects = data.subjects.map((s) => ({
        subject: s.subject.trim(),
        topics: typeof s.topics === 'string' ? s.topics.split(',').map((t) => t.trim()).filter(Boolean) : s.topics,
      }));

      const payload = {
        examName: data.examName.trim(),
        examDate: data.examDate,
        dailyStudyHours: Number(data.dailyStudyHours),
        subjects: formattedSubjects,
      };

      await examService.create(payload);
      toast.success('Study plan generated successfully!');
      setShowModal(false);
      reset();
      fetchPlan();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate study plan');
    } finally {
      setCreating(false);
    }
  };

  const handleChat = async (question) => {
    setChatMessages((prev) => [...prev, { role: 'user', content: question }]);
    setChatLoading(true);
    try {
      const res = await examService.chat(question);
      const answer = res.data?.answer || res.data?.data?.answer || 'No response';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Chat failed');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
            <HiCalendar className="w-7 h-7 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Plan Assistant</h1>
            <p className="text-sm text-slate-500 mt-1">
              Create an AI study plan and chat with your assistant to refine it
            </p>
          </div>
        </div>
        <PrimaryButton onClick={() => setShowModal(true)} icon={HiPlus}>
          New Plan
        </PrimaryButton>
      </div>

      {loading ? (
        <Loader text="Fetching study plan..." />
      ) : !plan ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <EmptyState
            icon={HiCalendar}
            title="No Exam Plan Yet"
            description="Create your first study plan to start chatting with the Plan Assistant."
            action={
              <PrimaryButton onClick={() => setShowModal(true)} icon={HiPlus}>
                Create Study Plan
              </PrimaryButton>
            }
          />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Chat Interface */}
          <div className="h-[600px]">
            <ChatInterface
              messages={chatMessages}
              onSend={handleChat}
              loading={chatLoading}
              placeholder="Ask questions about your study plan..."
              suggestedQuestions={[
                'How should I prioritize my topics?',
                'Give me a revision strategy for the last 3 days',
                'Modify this plan to focus more on my weak areas',
              ]}
            />
          </div>
        </div>
      )}

      {/* Create Exam Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Exam Study Plan" size="lg">
        <form onSubmit={handleSubmit(onCreateExam)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Exam Name <span className="text-rose-500">*</span>
            </label>
            <input
              {...register('examName', { required: 'Exam name is required' })}
              placeholder="e.g. Data Structures Midterm"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {errors.examName && <p className="text-xs text-rose-500 mt-1.5">{errors.examName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Exam Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                {...register('examDate', { required: 'Exam date is required' })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              {errors.examDate && <p className="text-xs text-rose-500 mt-1.5">{errors.examDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Daily Study Hours (1-12) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="12"
                {...register('dailyStudyHours', { required: 'Required', min: 1, max: 12 })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-700">
                Subjects & Topics <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => append({ subject: '', topics: '' })}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg"
              >
                <HiPlus className="w-4 h-4" /> Add Subject
              </button>
            </div>

            {fields.map((field, idx) => (
              <div key={field.id} className="flex gap-3 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex-1 space-y-3">
                  <input
                    {...register(`subjects.${idx}.subject`, { required: 'Required' })}
                    placeholder="Subject Name (e.g. DBMS)"
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white border border-slate-200 text-slate-900"
                  />
                  <input
                    {...register(`subjects.${idx}.topics`, { required: 'Required' })}
                    placeholder="Topics (comma separated: SQL, Indexing, Normalization)"
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white border border-slate-200 text-slate-900"
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="p-2.5 mt-1 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <PrimaryButton type="submit" loading={creating} className="w-full py-4 text-lg">
              Generate AI Study Plan
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExamPlanner;
