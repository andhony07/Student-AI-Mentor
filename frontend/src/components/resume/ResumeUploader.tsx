import React, { useRef, useState } from 'react';
import { Upload, FileText, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';
import UploadProgress from './UploadProgress';

interface ResumeUploaderProps {
  onFileUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadedFileName: string | null;
  onRemoveFile?: () => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onFileUpload,
  isUploading,
  uploadedFileName,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progressVal, setProgressVal] = useState(0);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Only PDF resume files are supported by the backend.');
      return;
    }

    setSelectedFile(file);
    setProgressVal(40);

    try {
      setProgressVal(75);
      await onFileUpload(file);
      setProgressVal(100);
    } catch {
      setProgressVal(0);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleChange}
        className="hidden"
      />

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
            : selectedFile || uploadedFileName
            ? 'border-emerald-300 bg-emerald-50/30'
            : 'border-slate-300 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/20'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <RefreshCw className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
            <p className="font-semibold text-slate-800 text-sm">Uploading & Parsing PDF Resume...</p>
            <p className="text-xs text-slate-500 mt-1">Extracting text for ATS scoring</p>
          </div>
        ) : selectedFile || uploadedFileName ? (
          <div className="flex flex-col items-center w-full">
            <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 mb-2">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="font-bold text-slate-800 text-sm truncate max-w-xs">
              {selectedFile?.name || uploadedFileName}
            </p>
            {selectedFile && (
              <p className="text-[11px] text-slate-500 mt-0.5">
                Size: {formatFileSize(selectedFile.size)}
              </p>
            )}

            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Replace File
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (onRemoveFile) onRemoveFile();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded-2xl bg-indigo-100 p-4 text-indigo-600 mb-3">
              <Upload className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Drag & Drop Resume PDF</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
              Supports single or multi-page PDF files up to 10 MB.
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">
              <FileText className="h-4 w-4" /> Browse PDF File
            </span>
          </div>
        )}
      </div>

      <UploadProgress
        isUploading={isUploading}
        progress={progressVal}
        fileName={selectedFile?.name || uploadedFileName}
      />
    </div>
  );
};

export default ResumeUploader;
