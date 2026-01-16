
import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ProjectState, PriorityLevel } from '../types.ts';
import { RISK_THRESHOLD, VALUE_THRESHOLD } from '../constants.tsx';

interface AnalysisViewProps {
  project: ProjectState;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ project }) => {
  const totalValue = (Object.values(project.value) as number[]).reduce((a, b) => a + b, 0);
  const totalRisk = (Object.values(project.risk) as number[]).reduce((a, b) => a + b, 0);
  const isHighRisk = totalRisk >= RISK_THRESHOLD;

  const priority = useMemo(() => {
    if (totalValue >= VALUE_THRESHOLD && totalRisk < RISK_THRESHOLD) return PriorityLevel.P0;
    if (totalValue >= VALUE_THRESHOLD && totalRisk >= RISK_THRESHOLD) return PriorityLevel.P1;
    if (totalValue < VALUE_THRESHOLD && totalRisk < RISK_THRESHOLD) return PriorityLevel.P2;
    return PriorityLevel.WARNING;
  }, [totalValue, totalRisk]);

  const chartData = [
    { name: '利潤', val: project.value.profit },
    { name: '作品', val: project.value.portfolio },
    { name: '關係', val: project.value.clientRel },
    { name: '訓練', val: project.value.training },
    { name: '趣味', val: project.value.fun },
  ];

  const riskData = [
    { name: '窗口', val: project.risk.clientReliability },
    { name: '參與', val: project.risk.participation },
    { name: '壓力', val: project.risk.timePressure },
    { name: '要求', val: project.risk.demands },
    { name: '能力', val: project.risk.capabilityGap },
    { name: '變數', val: project.risk.internalVariables },
  ];

  const getPriorityColor = (p: PriorityLevel) => {
    switch (p) {
      case PriorityLevel.P0: return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case PriorityLevel.P1: return 'text-amber-600 bg-amber-50 border-amber-200';
      case PriorityLevel.P2: return 'text-stone-600 bg-stone-50 border-stone-200';
      case PriorityLevel.WARNING: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getPriorityAdvice = (p: PriorityLevel) => {
    switch (p) {
      case PriorityLevel.P0: return '高價值、低風險。這是黃金專案，應全力爭取並優先配置最優資源。';
      case PriorityLevel.P1: return '高價值、高風險。具有顯著潛力但伴隨巨大挑戰，需安排專人監控風險點。';
      case PriorityLevel.P2: return '低價值、低風險。適合用於填補人力空檔或鍛鍊新人，行有餘力再接。';
      case PriorityLevel.WARNING: return '低價值、高風險。典型的坑洞專案，強烈建議拒絕或大幅調整合約條件。';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <p className="text-sm font-medium text-stone-500 mb-1">價值總分 (Value)</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold text-emerald-600">{totalValue}</h2>
            <span className="text-stone-400 text-sm">/ 10</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${(totalValue / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <p className="text-sm font-medium text-stone-500 mb-1">風險總分 (Risk)</p>
          <div className="flex items-baseline gap-2">
            <h2 className={`text-4xl font-bold ${isHighRisk ? 'text-red-600' : 'text-stone-700'}`}>{totalRisk}</h2>
            <span className="text-stone-400 text-sm">/ 12</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className={`${isHighRisk ? 'bg-red-500' : 'bg-stone-500'} h-full transition-all duration-500`} 
              style={{ width: `${(totalRisk / 12) * 100}%` }}
            />
          </div>
        </div>

        <div className={`p-6 rounded-2xl border flex flex-col justify-center transition-all ${getPriorityColor(priority)}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">Priority Level</p>
              <h2 className="text-5xl font-black mt-1">{priority === PriorityLevel.WARNING ? '!!' : priority}</h2>
            </div>
            {isHighRisk && (
              <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded animate-pulse">
                ❗️高風險專案❗️
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-6 bg-amber-400 rounded-full"></div>
          <h3 className="font-bold text-lg">製片經理決策建議 (Decision Advice)</h3>
        </div>
        <p className="text-stone-300 leading-relaxed">
          {getPriorityAdvice(priority)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200">
          <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">價值維度分析 (Value Insights)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 12 }} />
                <Radar
                  name="Value"
                  dataKey="val"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200">
          <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">風險分佈狀況 (Risk Distribution)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical">
                <XAxis type="number" hide domain={[0, 2]} />
                <YAxis dataKey="name" type="category" width={40} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="val" radius={[0, 4, 4, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.val === 2 ? '#ef4444' : entry.val === 1 ? '#f59e0b' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
