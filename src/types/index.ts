export interface BusinessInfo {
  productDescription: string;
  industry: string;
  targetAudience: {
    ageRange: string;
    location: string;
    interests: string[];
  };
  brandReferences: string[];
  currentMarketing: string[];
  budget: string;
  goals: string[];
}

export interface TasteProfile {
  musicGenres: string[];
  entertainmentPreferences: string[];
  lifestyleChoices: string[];
  socialMediaBehavior: string[];
  contentConsumption: string[];
  brandAffinities: string[];
}

export interface MarketingStrategy {
  brandMessaging: {
    taglines: string[];
    valuePropositions: string[];
    brandVoice: string;
  };
  contentCalendar: ContentCalendarItem[];
  channels: RecommendedChannel[];
  influencerStrategy: InfluencerStrategy;
  adScripts: AdScript[];
}

export interface ContentCalendarItem {
  week: number;
  platform: string;
  contentType: string;
  title: string;
  description: string;
  hashtags: string[];
  bestPostTime: string;
}

export interface RecommendedChannel {
  platform: string;
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  contentTypes: string[];
  budget: string;
  expectedROI: string;
}

export interface InfluencerStrategy {
  tierRecommendations: {
    tier: string;
    followerRange: string;
    budget: string;
    outreachTemplate: string;
  }[];
  platformFocus: string[];
  collaborationTypes: string[];
}

export interface AdScript {
  platform: string;
  duration: string;
  script: string;
  hooks: string[];
  cta: string;
}