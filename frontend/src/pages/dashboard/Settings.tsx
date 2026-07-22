import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Moon } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Preferences"
        description="Manage your account preferences, notification alerts, and security settings."
        icon={SettingsIcon}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Profile Details</h3>
              <p className="text-xs text-slate-500">Academic & contact info</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
              <p className="text-xs text-slate-500">Email & study alerts</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Security & Privacy</h3>
              <p className="text-xs text-slate-500">Password & JWT tokens</p>
            </div>
          </div>
        </div>
      </div>

      <EmptyState
        title="Settings Customization"
        description="Configure your Student AI Mentor portal theme, notification schedules, and integration settings."
        icon={Moon}
      />
    </div>
  );
};

export default Settings;
