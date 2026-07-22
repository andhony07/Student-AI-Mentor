import React, { useRef, useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface FileUploadProps {
  accept: string;
  maxSizeMB?: number;
  label: string;
  description: string;
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  uploadedFileName?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSizeMB = 10,
  label,
  description,
  onFileSelect,
  isLoading = false,
  uploadedFileName = null,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndHandleFile = (file: File) => {
    setError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds limit of ${maxSizeMB} MB`);
      return;
    }
    onFileSelect(file);
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
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
            : uploadedFileName
            ? 'border-emerald-300 bg-emerald-50/30'
            : 'border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/20'
        } ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <RefreshCw className="h-10 w-10 animate-spin text-blue-600 mb-3" />
            <p className="font-semibold text-slate-700">Uploading & Processing File...</p>
            <p className="text-xs text-slate-500 mt-1">Extracting details for AI Analysis</p>
          </div>
        ) : uploadedFileName ? (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 mb-3">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="font-semibold text-slate-800">{uploadedFileName}</p>
            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
              File uploaded & ready for analysis
            </p>
            <button
              type="button"
              className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Upload another file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-100 p-4 text-blue-600 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>
            <h4 className="font-semibold text-slate-800 text-base">{label}</h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-blue-700">
              <FileText className="h-4 w-4" /> Browse File
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
