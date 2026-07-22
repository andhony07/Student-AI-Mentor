import React from 'react';
import { Briefcase } from 'lucide-react';
import type { InternshipItem } from '../../types/internship.types';
import InternshipCard from './InternshipCard';
import LoadingSpinner from '../LoadingSpinner';

interface InternshipGridProps {
  internships: InternshipItem[];
  isLoading: boolean;
  onViewDetails: (item: InternshipItem) => void;
  onSave: (item: InternshipItem) => void;
  savedIds: string[];
}

const InternshipGrid: React.FC<InternshipGridProps> = ({
  internships,
  isLoading,
  onViewDetails,
  onSave,
  savedIds,
}) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
        <LoadingSpinner text="Searching external internship portals via JSearch API..." />
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center space-y-2">
        <Briefcase className="h-10 w-10 text-slate-400 mx-auto" />
        <h4 className="font-bold text-slate-700 text-sm">No Internships Found</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Make sure your PDF Resume is uploaded to match target roles, or try clearing search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {internships.map((item, idx) => (
        <InternshipCard
          key={idx}
          internship={item}
          onViewDetails={onViewDetails}
          onSave={onSave}
          isSaved={savedIds.includes(item.role + item.company)}
        />
      ))}
    </div>
  );
};

export default InternshipGrid;
