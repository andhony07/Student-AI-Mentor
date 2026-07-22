import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiMail, HiPaperAirplane, HiChatAlt2 } from 'react-icons/hi';
import GlassCard from '../../components/Cards/GlassCard';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    // Simulate network delay / client feedback
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Thank you for contacting us! We will get back to you soon.');
    reset();
    setSubmitting(false);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm';

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <HiMail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Have questions or feedback? Send us a message!
          </p>
        </div>
      </div>

      <GlassCard>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="John Doe"
              className={inputClass}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
              placeholder="you@example.com"
              className={inputClass}
            />
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject *
            </label>
            <input
              {...register('subject', { required: 'Subject is required' })}
              placeholder="General inquiry, bug report, feedback..."
              className={inputClass}
            />
            {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message *
            </label>
            <textarea
              rows="4"
              {...register('message', { required: 'Message is required' })}
              placeholder="Type your query or feedback here..."
              className={`${inputClass} resize-none`}
            />
            {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message.message}</p>}
          </div>

          <PrimaryButton type="submit" loading={submitting} icon={HiPaperAirplane} className="w-full">
            Submit Query
          </PrimaryButton>
        </form>
      </GlassCard>
    </div>
  );
};

export default Contact;
