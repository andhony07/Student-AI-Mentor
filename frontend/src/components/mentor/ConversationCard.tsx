import React, { useState } from 'react';
import { MessageSquare, Pin, Edit2, Trash2, Check, X } from 'lucide-react';
import type { ConversationSession } from '../../services/mentor.service';

interface ConversationCardProps {
  session: ConversationSession;
  isActive: boolean;
  onSelect: () => void;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  session,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(session.title);

  const handleSaveRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRename(editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between rounded-xl p-2.5 border transition-all cursor-pointer ${
        isActive
          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-2xs'
          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <MessageSquare
          className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}
        />
        {isEditing ? (
          <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs text-slate-800 focus:outline-hidden"
              autoFocus
            />
            <button onClick={handleSaveRename} className="text-emerald-600 hover:text-emerald-800">
              <Check className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <p className="text-xs truncate">{session.title}</p>
            <p className="text-[10px] text-slate-400 font-normal">
              {session.messages.length} messages
            </p>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {session.isPinned && <Pin className="h-3 w-3 text-emerald-600 fill-emerald-600" />}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            title="Rename Chat"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-slate-400 hover:text-red-600 rounded-md"
            title="Delete Chat"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ConversationCard;
