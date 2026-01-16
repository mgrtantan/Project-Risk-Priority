
import React from 'react';
import { Score } from './types.ts';

export const VALUE_CRITERIA = [
  { id: 'profit', label: '簽價利潤 (Profit)', description: '專案毛利與預算規模' },
  { id: 'portfolio', label: 'Credit 加分 (Portfolio)', description: '作品集含金量與獎項潛力' },
  { id: 'clientRel', label: '客戶關係 (Client Rel.)', description: '長期戰略價值與品牌信任度' },
  { id: 'training', label: '教育訓練 (Training)', description: '新技術應用或團隊成長價值' },
  { id: 'fun', label: 'Fun (Creative Space)', description: '創意發揮空間與趣味度' },
] as const;

export const RISK_CRITERIA = [
  { id: 'clientReliability', label: '窗口雷度', description: '對口經驗、變換頻率與溝通效率' },
  { id: 'participation', label: '天灝參與度', description: '內部團隊介入深度與資源佔用' },
  { id: 'timePressure', label: '時間壓力', description: '時程合理性與急迫程度' },
  { id: 'demands', label: '客戶要求程度', description: '修片次數預期與龜毛程度' },
  { id: 'capabilityGap', label: '專業能力不及', description: '技術門檻與團隊成熟度落差' },
  { id: 'internalVariables', label: '內部變數', description: '人力缺口、外包依賴或協作風險' },
] as const;

export const SCORE_LABELS: Record<Score, string> = {
  [Score.Low]: '低 (0)',
  [Score.Medium]: '中 (1)',
  [Score.High]: '高 (2)',
};

export const RISK_THRESHOLD = 6;
export const VALUE_THRESHOLD = 6;
