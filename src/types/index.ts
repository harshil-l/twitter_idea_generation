// Core type definitions for SaaS Automation System

export interface SaaSCandidate {
  name: string;
  url: string;
  description: string;
  category: string;
  features: string[];
  pricing?: string;
  techStack?: string;
  cloneDifficulty: 'easy' | 'medium' | 'hard';
  marketPotential: 'low' | 'medium' | 'high';
  source?: string;
  score?: number;
  
  // Optional metrics from different sources
  votes?: number;
  comments?: number;
  stars?: number;
  forks?: number;
  funding?: string;
  revenue?: string;
}

export interface SaaSAnalysis {
  name: string;
  url: string;
  timestamp: string;
  coreFeatures: CoreFeature[];
  techRequirements: TechRequirements;
  uiComponents: string[];
  databaseSchema: DatabaseSchema;
  apiEndpoints: string[];
  developmentEstimate: DevelopmentEstimate;
}

export interface CoreFeature {
  name: string;
  priority: 'low' | 'medium' | 'high';
  complexity: 'low' | 'medium' | 'high';
  implementation: string;
}

export interface TechRequirements {
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  cdn?: string;
  monitoring?: string;
  analytics?: string;
}

export interface DatabaseSchema {
  [tableName: string]: {
    [fieldName: string]: string;
  };
}

export interface DevelopmentEstimate {
  mvp: number;
  fullFeature: number;
  polish: number;
}

export interface TwitterContent {
  singleTweets: Tweet[];
  tweetThread: string[];
  hashtags: string[];
  suggestedSchedule: {
    launch: string;
    progress: string;
    engagement: string;
    thread: string;
  };
  contentTips: string[];
}

export interface Tweet {
  id: number;
  template: string;
  content: string;
  type: 'launch' | 'progress' | 'engagement';
}

export interface LaunchPackage {
  project: {
    name: string;
    description: string;
    category: string;
    difficulty: string;
    features: string[];
    score: number;
  };
  development: {
    location: string;
    techStack: string;
    estimatedTime: string;
    status: string;
  };
  deployment: {
    frontend: string;
    backend: string;
    database: string;
    domain: string;
  };
  marketing: {
    twitterReady: boolean;
    contentGenerated: boolean;
    hashtags: string[];
    launchTweet: string;
  };
  nextSteps: string[];
  monetization: {
    freemium: string;
    pro: string;
    enterprise: string;
    onetime: string;
  };
  timeline: {
    [key: string]: string;
  };
}

export interface DiscoveryResult {
  candidate: SaaSCandidate;
  analysis: SaaSAnalysis;
  nextSteps: string[];
}

export interface AutomationResult {
  saas: SaaSCandidate;
  codeLocation: string;
  twitterContent: TwitterContent;
  launchPackage: LaunchPackage;
}

export interface ContentVariables {
  saas_name: string;
  feature_count: number;
  hours: number;
  day: number;
  main_feature: string;
  secondary_feature: string;
  pricing: string;
  tech_stack: string;
  category: string;
}
