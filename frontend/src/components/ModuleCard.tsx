import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, type LucideIcon } from 'lucide-react';

export interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  badge: string;
  color?: string;
  bgColor?: string;
  features?: string[];
  status?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  path,
  icon: Icon,
  badge,
  color = 'from-blue-600 to-indigo-600',
  bgColor = 'bg-blue-50 text-blue-600',
  features = [],
  status = 'Active',
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Header Icon & Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bgColor} shadow-xs group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              {status}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              {badge}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">{description}</p>

        {/* Optional Bullet Features */}
        {features.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-[11px] text-slate-600">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Open Button */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
        <span>Open Module</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
