import React from 'react';
import { CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
  fileName: string | null;
  recordsInserted?: number | null;
  skippedRows?: number | null;
  error?: string | null;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  isUploading,
  progress,
  fileName,
  recordsInserted,
  skippedRows,
  error,
}) => {
  if (!isUploading && !fileName && !error) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 mt-4">
      {isUploading ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600" />
              Processing & Storing LMS Data...
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Parsing spreadsheet rows and connecting to MongoDB...
          </p>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Upload Complete: {fileName}</span>
          </div>
          {recordsInserted !== undefined && recordsInserted !== null && (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[11px] font-bold">
                {recordsInserted} records inserted
              </span>
              {skippedRows ? (
                <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px]">
                  {skippedRows} skipped
                </span>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
