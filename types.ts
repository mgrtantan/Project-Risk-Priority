
export enum Score {
  Low = 0,
  Medium = 1,
  High = 2
}

export interface ValueScores {
  profit: Score;
  portfolio: Score;
  clientRel: Score;
  training: Score;
  fun: Score;
}

export interface RiskScores {
  clientReliability: Score;
  participation: Score;
  timePressure: Score;
  demands: Score;
  capabilityGap: Score;
  internalVariables: Score;
}

export interface ProjectState {
  projectName: string;
  aeName: string;
  value: ValueScores;
  risk: RiskScores;
}

export enum PriorityLevel {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  WARNING = 'REJECT'
}
