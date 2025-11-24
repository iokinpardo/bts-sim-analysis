export interface RAPIDRoles {
  R?: string;
  A?: string[];
  P?: string[];
  I?: string[];
  D?: string;
  confidence: string;
}

export interface Evidence {
  speaker: string;
  t: string;
  quote: string;
}

export interface Decision {
  title: string;
  status: string;
  RAPID_roles_approx: RAPIDRoles;
  evidence: Evidence[];
}

export interface Argument {
  claim: string;
  data: string;
  warrant: string;
  backing: string;
  qualifier: string;
  rebuttal: string;
  t: string;
}

export interface ArgumentsByParticipant {
  [key: string]: Argument[];
}

export interface BiasRisk {
  type: string;
  evidence_t: string;
  note: string;
}

export interface OptionScore {
  ROI: number;
  Risk: number;
  Time: number;
  Cost: number;
}

export interface PlanOption {
  name: string;
  scores: OptionScore;
  note: string;
}

export interface PlanAlternatives {
  criteria: { name: string; weight: number }[];
  options: PlanOption[];
  recommendation: string;
  sensitivity: string;
  explicit_assumptions: string;
}

export interface TeamData {
  team_id: string;
  members: string[];
  summary: string;
  decisions: Decision[];
  arguments_by_participant: ArgumentsByParticipant;
  biases_and_risks: BiasRisk[];
  plan_alternatives: PlanAlternatives;
  next_actions: { action: string; owner_approx: string; deadline: string }[];
}

export interface SimulationData {
  schema_version: string;
  simulation: {
    period: string;
    key_variables: string[];
  };
  teams: TeamData[];
  teams_comparative: {
    common_patterns: string;
    key_differences: string;
    RAPID_roles_map_summary: any;
    transversal_risks: string[];
    opportunities: string;
  };
}