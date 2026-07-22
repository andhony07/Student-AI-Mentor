import React, { useRef, useState } from 'react';
import { Upload, FileSpreadsheet, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';
import UploadProgress from './UploadProgress';

interface ExcelUploaderProps {
  onFileUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadedFileName: string | null;
  recordsInserted?: number | null;
  onRemoveFile?: () => void;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({
  onFileUpload,
  isUploading,
  uploadedFileName,
  recordsInserted,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgressVal, setUploadProgressVal] = useState(0);

  const handleFile = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx' && ext !== 'xls') {
      alert('Only .xlsx and .xls Excel files are accepted.');
      return;
    }

    setSelectedFile(file);
    setUploadProgressVal(40);

    try {
      setUploadProgressVal(75);
      await onFileUpload(file);
      setUploadProgressVal(100);
    } catch {
      setUploadProgressVal(0);
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
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
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
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
            : selectedFile || uploadedFileName
            ? 'border-emerald-300 bg-emerald-50/30'
            : 'border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/20'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <RefreshCw className="h-10 w-10 animate-spin text-blue-600 mb-3" />
            <p className="font-semibold text-slate-800 text-sm">Uploading LMS Excel File...</p>
            <p className="text-xs text-slate-500 mt-1">Extracting grades, quizzes & attendance</p>
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
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
            <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 mb-3">
              <Upload className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Drag & Drop LMS Excel (.xlsx, .xls)</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
              Upload spreadsheets containing course name, quiz scores, assignment scores, and attendance.
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700">
              <FileSpreadsheet className="h-4 w-4" /> Browse Excel File
            </span>
          </div>
        )}
      </div>

      <UploadProgress
        isUploading={isUploading}
        progress={uploadProgressVal}
        fileName={selectedFile?.name || uploadedFileName}
        recordsInserted={recordsInserted}
      />
    </div>
  );
};

export default ExcelUploader;
