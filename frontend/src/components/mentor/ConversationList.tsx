import React, { useState } from 'react';
import { Plus, Search, MessageSquare, Pin } from 'lucide-react';
import type { ConversationSession } from '../../services/mentor.service';
import ConversationCard from './ConversationCard';

interface ConversationListProps {
  sessions: ConversationSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onDeleteSession: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onRenameSession,
  onDeleteSession,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedSessions = filtered.filter((s) => s.isPinned);
  const recentSessions = filtered.filter((s) => !s.isPinned);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-4 flex flex-col h-[580px]">
      <button
        onClick={onNewChat}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition-all cursor-pointer"
      >
        <Plus className="h-4 w-4" /> New Learning Chat
      </button>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chats..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
        />
      </div>

      {/* Scrollable Conversations List */}
      <div className="flex-1 overflow-y-auto space-y-3 chat-scroll pr-1">
        {pinnedSessions.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 px-1">
              <Pin className="h-3 w-3" /> Pinned
            </h4>
            {pinnedSessions.map((s) => (
              <ConversationCard
                key={s.id}
                session={s}
                isActive={s.id === activeSessionId}
                onSelect={() => onSelectSession(s.id)}
                onRename={(title) => onRenameSession(s.id, title)}
                onDelete={() => onDeleteSession(s.id)}
              />
            ))}
          </div>
        )}

        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 px-1">
            <MessageSquare className="h-3 w-3" /> Recent Conversations
          </h4>
          {recentSessions.length > 0 ? (
            recentSessions.map((s) => (
              <ConversationCard
                key={s.id}
                session={s}
                isActive={s.id === activeSessionId}
                onSelect={() => onSelectSession(s.id)}
                onRename={(title) => onRenameSession(s.id, title)}
                onDelete={() => onDeleteSession(s.id)}
              />
            ))
          ) : (
            <p className="text-xs text-slate-400 text-center py-4">No recent chats found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
