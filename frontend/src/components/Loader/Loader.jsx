import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 w-10 h-10 rounded-full border-4 border-violet-500/20 border-b-violet-500"
        />
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">{spinner}</div>
  );
};

// Skeleton loaders
export const SkeletonCard = () => (
  <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-4" />
    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full mb-2" />
    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
  </div>
);

export const SkeletonLine = ({ width = 'w-full' }) => (
  <div className={`h-4 bg-gray-200 dark:bg-white/10 rounded ${width} animate-pulse`} />
);

export default Loader;
