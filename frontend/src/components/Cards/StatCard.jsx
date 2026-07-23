import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const StatCard = ({ icon: Icon, label, value, trend, color = 'indigo', delay = 0 }) => {
  const colorMap = {
    indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/20',
    violet: 'from-violet-500 to-violet-600 shadow-violet-500/20',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
    rose: 'from-rose-500 to-rose-600 shadow-rose-500/20',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/20',
    cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'rounded-2xl p-6',
        'bg-white dark:bg-white/5',
        'backdrop-blur-xl',
        'border border-gray-100 dark:border-white/10',
        'shadow-lg dark:shadow-black/20',
        'transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1'
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                'text-xs font-medium mt-1',
                trend > 0 ? 'text-emerald-500' : 'text-rose-500'
              )}
            >
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            'bg-gradient-to-br shadow-lg',
            colorMap[color]
          )}
        >
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
