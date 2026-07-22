import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCloudUpload, HiDocument, HiX } from 'react-icons/hi';
import { cn } from '../../utils/helpers';

const FileUpload = ({ accept, onFileSelect, label, description, maxSize = '10MB' }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        setFile(droppedFile);
        onFileSelect?.(droppedFile);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer',
          dragActive
            ? 'border-indigo-500 bg-indigo-500/5'
            : 'border-gray-300 dark:border-white/20 hover:border-indigo-400 hover:bg-indigo-500/5'
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {file ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3"
          >
            <HiDocument className="w-8 h-8 text-indigo-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <HiX className="w-4 h-4 text-gray-400" />
            </button>
          </motion.div>
        ) : (
          <div>
            <HiCloudUpload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Drag & drop or click to upload
            </p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Max size: {maxSize}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
