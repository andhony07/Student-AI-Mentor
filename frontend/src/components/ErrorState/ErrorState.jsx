import { motion } from 'framer-motion';
import { HiExclamationCircle, HiRefresh } from 'react-icons/hi';
import PrimaryButton from '../Buttons/PrimaryButton';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center mb-6">
        <HiExclamationCircle className="w-10 h-10 text-rose-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <PrimaryButton onClick={onRetry} icon={HiRefresh}>
          Try Again
        </PrimaryButton>
      )}
    </motion.div>
  );
};

export default ErrorState;
