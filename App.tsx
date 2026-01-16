
import React, { useState, useCallback } from 'react';
import { ProjectState, Score } from './types.ts';
import { VALUE_CRITERIA, RISK_CRITERIA } from './constants.tsx';
import { DashboardHeader } from './components/DashboardHeader.tsx';
import { ScoreGroup } from './components/ScoreGroup.tsx';
import { AnalysisView } from './components/AnalysisView.tsx';

const App: React.FC = () => {
  const [project, setProject] = useState<ProjectState>({
    projectName: '',
    aeName: '',
    value: {
      profit: Score.Low,
      portfolio: Score.Low,
      clientRel: Score.Low,
      training: Score.Low,
      fun: Score.Low,
    },
    risk: {
      clientReliability: Score.Low,
      participation: Score.Low,
      timePressure: Score.Low,
      demands: Score.Low,
      capabilityGap: Score.Low,
      internalVariables: Score.Low,
    },
  });

  const updateValue = useCallback((key: keyof ProjectState['value'], val: Score) => {
    setProject((prev) => ({
      ...prev,
      value: { ...prev.value, [key]: val },
    }));
  }, []);

  const updateRisk = useCallback((key: keyof ProjectState['risk'], val: Score) => {
    setProject((prev) => ({
      ...prev,
      risk: { ...prev.risk, [key]: val },
    }));
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-stone-800 rounded-full"></span>
              專案資訊 (Project Info)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-500 uppercase">專案名稱</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2024 春季廣告"
                  className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  value={project.projectName}
                  onChange={(e) => setProject(p => ({ ...p, projectName: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-500 uppercase">提報 AE</label>
                <input 
                  type="text" 
                  placeholder="e.g. David Lin"
                  className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  value={project.aeName}
                  onChange={(e) => setProject(p => ({ ...p, aeName: e.target.value }))}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
              價值評估 (Value Audit)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUE_CRITERIA.map((item) => (
                <ScoreGroup
                  key={item.id}
                  label={item.label}
                  description={item.description}
                  value={project.value[item.id as keyof ProjectState['value']]}
                  onChange={(v) => updateValue(item.id as keyof ProjectState['value'], v)}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-red-500 rounded-full"></span>
              風險判定 (Risk Assessment)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RISK_CRITERIA.map((item) => (
                <ScoreGroup
                  key={item.id}
                  isRisk
                  label={item.label}
                  description={item.description}
                  value={project.risk[item.id as keyof ProjectState['risk']]}
                  onChange={(v) => updateRisk(item.id as keyof ProjectState['risk'], v)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 sticky top-24 self-start">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">審核報告 (Audit Report)</h2>
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors shadow-sm"
            >
              匯出 PDF
            </button>
          </div>
          <AnalysisView project={project} />
          
          <div className="mt-8 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm italic text-stone-400 text-sm">
            <p>
              &quot;作為資深製片經理，我們的職責不是拒絕所有風險，而是確保每一分投入都有其相應的戰略價值。&quot;
            </p>
          </div>
        </div>

      </main>

      {/* Mobile Footer CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-200 z-50">
        <button 
          className="w-full py-3 bg-stone-900 text-white font-bold rounded-xl shadow-lg"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        >
          查看分析結果
        </button>
      </div>
    </div>
  );
};

export default App;
