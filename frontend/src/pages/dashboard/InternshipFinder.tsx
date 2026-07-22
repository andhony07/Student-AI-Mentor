import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/internship/SearchBar';
import FilterSidebar from '../../components/internship/FilterSidebar';
import InternshipGrid from '../../components/internship/InternshipGrid';
import SavedList from '../../components/internship/SavedList';
import RecommendationCard from '../../components/internship/RecommendationCard';
import DetailsDrawer from '../../components/internship/DetailsDrawer';
import InternshipService from '../../services/internship.service';
import type { InternshipItem, TrackedInternship } from '../../types/internship.types';
import toast from 'react-hot-toast';

const fallbackJobs: InternshipItem[] = [
  {
    company: 'Google India',
    role: 'Software Engineering Intern 2026',
    location: 'Bangalore, India',
    mode: 'On-site',
    salary: '₹80,000 / month',
    applyLink: 'https://careers.google.com',
    description:
      'Join Google for a 12-week summer internship. You will work on production scale backend microservices, distributed systems, and real-time data pipelines.',
  },
  {
    company: 'Microsoft',
    role: 'Frontend Development Intern',
    location: 'Hyderabad, India',
    mode: 'Hybrid',
    salary: '₹75,000 / month',
    applyLink: 'https://careers.microsoft.com',
    description:
      'Build modern accessible web interfaces using React, TypeScript, and Azure Web Apps. Collaborate with cross-functional design and product engineering teams.',
  },
  {
    company: 'Amazon AWS',
    role: 'Cloud Infrastructure Intern',
    location: 'Remote, India',
    mode: 'Remote',
    salary: '₹65,000 / month',
    applyLink: 'https://amazon.jobs',
    description:
      'Develop cloud automation scripts using Node.js and AWS Serverless architecture. Optimize API latency and security policies.',
  },
];

const InternshipFinder: React.FC = () => {
  const [internships, setInternships] = useState<InternshipItem[]>([]);
  const [savedItems, setSavedItems] = useState<TrackedInternship[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [workMode, setWorkMode] = useState('All');
  const [stipendRange, setStipendRange] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('');

  // Selected for Details Drawer
  const [selectedInternship, setSelectedInternship] = useState<InternshipItem | null>(null);

  // Fetch external jobs from backend GET /api/internships/search
  const fetchSearchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await InternshipService.searchInternships();
      if (data && data.length > 0) {
        setInternships(data);
      } else {
        setInternships(fallbackJobs);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Please upload your PDF resume in Resume Analyzer first to find matching external jobs.';
      toast.error(msg);
      setInternships(fallbackJobs);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch saved applications from backend GET /api/internships
  const fetchSavedApplications = useCallback(async () => {
    try {
      const data = await InternshipService.getSavedInternships();
      setSavedItems(data);
    } catch {
      setSavedItems([]);
    }
  }, []);

  useEffect(() => {
    fetchSearchJobs();
    fetchSavedApplications();
  }, [fetchSearchJobs, fetchSavedApplications]);

  // Handle Save / Track application (POST /api/internships)
  const handleSaveInternship = async (item: InternshipItem) => {
    try {
      const newTracked = await InternshipService.saveInternship({
        companyName: item.company,
        role: item.role,
        status: 'interested',
        notes: `Salary: ${item.salary} | Location: ${item.location}`,
      });
      setSavedItems([newTracked, ...savedItems]);
      toast.success(`Tracked "${item.role}" at ${item.company}`);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Failed to track application';
      toast.error(msg);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setWorkMode('All');
    setStipendRange('All');
    setCompanyFilter('');
    toast.success('Reset all search filters');
  };

  // Filtered List
  const filteredInternships = InternshipService.filterInternships(
    internships,
    searchQuery || companyFilter,
    workMode,
    locationQuery
  );

  const savedIds = savedItems.map((s) => s.role + s.companyName);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Internship Finder"
        description="Discover internships based on your skills and interests."
        icon={Briefcase}
        action={
          <button
            onClick={fetchSearchJobs}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Jobs
          </button>
        }
      />

      {/* Main 3-Column Layout: Desktop / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Filters (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <FilterSidebar
            workMode={workMode}
            onWorkModeChange={setWorkMode}
            stipendRange={stipendRange}
            onStipendChange={setStipendRange}
            companyFilter={companyFilter}
            onCompanyChange={setCompanyFilter}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Center Panel: Search & Internship Cards Grid (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            locationQuery={locationQuery}
            onLocationChange={setLocationQuery}
          />

          <InternshipGrid
            internships={filteredInternships}
            isLoading={isLoading}
            onViewDetails={(item) => setSelectedInternship(item)}
            onSave={handleSaveInternship}
            savedIds={savedIds}
          />
        </div>

        {/* Right Panel: Saved & Recommended (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <SavedList savedItems={savedItems} />
          <RecommendationCard
            recommendations={internships}
            onSelect={(item) => setSelectedInternship(item)}
          />
        </div>
      </div>

      {/* Details Drawer */}
      <DetailsDrawer
        internship={selectedInternship}
        onClose={() => setSelectedInternship(null)}
        onSave={handleSaveInternship}
        isSaved={
          selectedInternship
            ? savedIds.includes(selectedInternship.role + selectedInternship.company)
            : false
        }
      />
    </div>
  );
};

export default InternshipFinder;
