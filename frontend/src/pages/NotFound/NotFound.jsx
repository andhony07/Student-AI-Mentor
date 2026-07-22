import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiSparkles } from 'react-icons/hi';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const NotFound = () => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-6 max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
          <HiSparkles className="w-8 h-8 text-white" />
        </div>

        <div>
          <h1 className="text-7xl font-black gradient-text">404</h1>
          <h2 className="text-xl font-bold text-white mt-2">Page Not Found</h2>
          <p className="text-sm text-gray-300 mt-2">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link to="/dashboard" className="inline-block w-full">
          <PrimaryButton icon={HiHome} className="w-full">
            Back to Dashboard
          </PrimaryButton>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
