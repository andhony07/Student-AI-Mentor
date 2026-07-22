import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={cn(
        'rounded-2xl p-6',
        'bg-white/5 dark:bg-white/5 bg-white/70',
        'dark:bg-white/5',
        'backdrop-blur-xl',
        'border border-white/10 dark:border-white/10 border-white/20',
        'shadow-xl shadow-black/5 dark:shadow-black/20',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
