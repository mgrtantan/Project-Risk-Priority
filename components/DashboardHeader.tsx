
import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-stone-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">P</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Project Risk & Priority</h1>
          <p className="text-xs text-stone-500 font-medium">PRE-PRODUCTION AUDIT SYSTEM</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-stone-700">Senior Producer</span>
          <span className="text-xs text-stone-400">Audit Mode Active</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm">
          <img src="https://picsum.photos/seed/producer/100/100" alt="Avatar" />
        </div>
      </div>
    </header>
  );
};
