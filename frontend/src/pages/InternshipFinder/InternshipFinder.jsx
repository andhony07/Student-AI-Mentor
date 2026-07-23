import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiSearch, HiLocationMarker, HiCurrencyDollar, HiExternalLink, HiPlus, HiChat } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { internshipService } from '../../services/internshipService';
import { mentorService } from '../../services/mentorService';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import Modal from '../../components/Modal/Modal';
import ChatInterface from '../../components/Chat/ChatInterface';

const statusColors = {
  interested: 'bg-blue-50 text-blue-700 border-blue-100',
  applied: 'bg-amber-50 text-amber-700 border-amber-100',
  interviewing: 'bg-violet-50 text-violet-700 border-violet-100',
  offered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  rejected: 'bg-rose-50 text-rose-700 border-rose-100',
};

const InternshipFinder = () => {
  const [tab, setTab] = useState('search');
  const [jobs, setJobs] = useState([]);
  const [tracked, setTracked] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loadingTracked, setLoadingTracked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (tab === 'tracker') loadTracked();
  }, [tab]);

  const handleSearch = async () => {
    try {
      setSearching(true);
      const { data } = await internshipService.search();
      setJobs(data?.data || data || []);
      if ((data?.data || data || []).length === 0) toast('No internships found. Try uploading a resume first.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Search failed. Upload a resume first.');
    } finally {
      setSearching(false);
    }
  };

  const loadTracked = async () => {
    try {
      setLoadingTracked(true);
      const { data } = await internshipService.getAll();
      setTracked(data?.data?.internships || data?.data || []);
    } catch {
      setTracked([]);
    } finally {
      setLoadingTracked(false);
    }
  };

  const onAddInternship = async (formData) => {
    try {
      setAdding(true);
      await internshipService.add(formData);
      toast.success('Internship added!');
      reset();
      setShowModal(false);
      loadTracked();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add');
    } finally {
      setAdding(false);
    }
  };

  const handleChat = async (question) => {
    setChatMessages((prev) => [...prev, { role: 'user', content: question }]);
    setChatLoading(true);
    try {
      // Using mentorService for general career advice
      const res = await mentorService.dailyChat(question);
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
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
            <HiBriefcase className="w-7 h-7 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Career & Internships</h1>
            <p className="text-sm text-slate-500 mt-1">Discover opportunities and get AI career advice</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
          <button onClick={() => setTab('search')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'search' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            <HiSearch className="w-4 h-4" /> Search Jobs
          </button>
          <button onClick={() => setTab('tracker')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'tracker' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            <HiBriefcase className="w-4 h-4" /> My Tracker
          </button>
          <button onClick={() => setTab('chat')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'chat' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            <HiChat className="w-4 h-4" /> Career Assistant
          </button>
        </div>
        {tab === 'tracker' && (
          <PrimaryButton onClick={() => setShowModal(true)} icon={HiPlus}>Add Application</PrimaryButton>
        )}
      </div>

      {/* Search Tab */}
      {tab === 'search' && (
        <div>
          <div className="mb-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">AI Matchmaking</h3>
              <p className="text-sm text-slate-500 mt-1">We'll use your latest uploaded resume to find tailored roles.</p>
            </div>
            <PrimaryButton onClick={handleSearch} loading={searching} icon={HiSearch}>
              Find Matches
            </PrimaryButton>
          </div>

          {searching ? (
            <Loader text="Searching for perfect matches..." />
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{job.role}</h3>
                        <p className="font-medium text-slate-500 mt-0.5">{job.company}</p>
                      </div>
                      <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">{job.mode}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                      <p className="text-sm text-slate-600 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><HiLocationMarker className="w-4 h-4 text-slate-400" /> {job.location}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><HiCurrencyDollar className="w-4 h-4 text-slate-400" /> {job.salary}</p>
                    </div>
                    <p className="text-sm text-slate-600 mb-6 flex-grow">{job.description}</p>
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 text-blue-600 font-bold hover:bg-blue-50 transition-colors border border-slate-100 hover:border-blue-100">
                      Apply on Company Site <HiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <EmptyState icon={HiSearch} title="No results yet" description="Click 'Find Matches' to search based on your resume." />
            </div>
          )}
        </div>
      )}

      {/* Tracker Tab */}
      {tab === 'tracker' && (
        <div>
          {loadingTracked ? <Loader text="Loading tracked internships..." /> : tracked.length > 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-5">Role & Company</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-4">Notes</div>
              </div>
              <div className="divide-y divide-slate-100">
                {tracked.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50 transition-colors">
                    <div className="col-span-5">
                      <p className="font-bold text-slate-900 text-sm">{item.role}</p>
                      <p className="font-medium text-slate-500 text-xs mt-0.5">{item.companyName}</p>
                    </div>
                    <div className="col-span-3">
                      <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border ${statusColors[item.status] || statusColors.interested}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="col-span-4 text-sm text-slate-600 truncate">
                      {item.notes || '-'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <EmptyState icon={HiBriefcase} title="No tracked internships" description="Start tracking your applications to stay organized." />
            </div>
          )}
        </div>
      )}

      {/* Chat Tab */}
      {tab === 'chat' && (
        <div className="h-[650px]">
          <ChatInterface
            messages={chatMessages}
            onSend={handleChat}
            loading={chatLoading}
            placeholder="Ask your Career Assistant about interviews, skills, and applications..."
            suggestedQuestions={['Which internship should I choose?', 'How should I prepare for interviews?', 'Which skills should I learn?']}
          />
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Track New Application" size="md">
        <form onSubmit={handleSubmit(onAddInternship)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name <span className="text-rose-500">*</span></label>
            <input {...register('companyName', { required: 'Required' })} placeholder="Google, Microsoft..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            {errors.companyName && <p className="text-xs text-rose-500 mt-1.5">{errors.companyName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role <span className="text-rose-500">*</span></label>
            <input {...register('role', { required: 'Required' })} placeholder="Frontend Developer Intern" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            {errors.role && <p className="text-xs text-rose-500 mt-1.5">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Application Status</label>
            <select {...register('status')} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option value="interested">Interested</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes (Optional)</label>
            <textarea {...register('notes')} rows="3" placeholder="Recruiter name, dates, thoughts..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
          </div>
          <div className="pt-2 border-t border-slate-100">
            <PrimaryButton type="submit" loading={adding} className="w-full py-3.5">Add to Tracker</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InternshipFinder;
