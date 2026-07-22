import React from 'react';

interface LoadingCardProps {
  count?: number;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-slate-200" />
            <div className="h-5 w-20 rounded-full bg-slate-200" />
          </div>
          <div className="h-5 w-3/4 rounded-md bg-slate-200" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-md bg-slate-200" />
            <div className="h-3 w-5/6 rounded-md bg-slate-200" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <div className="h-4 w-24 rounded-md bg-slate-200" />
            <div className="h-7 w-7 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCard;
