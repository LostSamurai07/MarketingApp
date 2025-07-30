import OpenAI from 'openai';
import axios from 'axios';
import { BusinessInfo, TasteProfile, MarketingStrategy } from '../types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from a backend
});

// Qloo API configuration
const QLOO_API_BASE = import.meta.env.VITE_QLOO_API_BASE;
const QLOO_API_KEY = import.meta.env.VITE_QLOO_API_KEY;

export class MarketingAPIService {
  static async analyzeCulturalTaste(businessInfo: BusinessInfo): Promise<TasteProfile> {
    try {
      // First, try to get cultural insights from Qloo
      let culturalData = null;
      
      if (QLOO_API_KEY && QLOO_API_KEY !== 'your_qloo_api_key_here') {
        try {
          culturalData = await this.getQlooCulturalData(businessInfo);
        } catch (qloo_error) {
          console.warn('Qloo API unavailable, using AI-generated cultural analysis:', qloo_error);
        }
      }

      // If Qloo data is not available, use GPT-4 to generate cultural insights
      if (!culturalData) {
        culturalData = await this.generateCulturalInsightsWithAI(businessInfo);
      }

      return culturalData;
    } catch (error) {
      console.error('Error analyzing cultural taste:', error);
      // Fallback to mock data if all AI services fail
      return this.getMockCulturalData(businessInfo);
    }
  }

  private static async getQlooCulturalData(businessInfo: BusinessInfo): Promise<TasteProfile> {
    const response = await axios.post(`${QLOO_API_BASE}/taste_profile`, {
      industry: businessInfo.industry,
      target_audience: {
        age_range: businessInfo.targetAudience.ageRange,
        location: businessInfo.targetAudience.location,
        interests: businessInfo.targetAudience.interests
      },
      brand_references: businessInfo.brandReferences
    }, {
      headers: {
        'Authorization': `Bearer ${QLOO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Map Qloo response to our TasteProfile interface
    return {
      musicGenres: response.data.music_preferences || [],
      entertainmentPreferences: response.data.entertainment || [],
      lifestyleChoices: response.data.lifestyle || [],
      socialMediaBehavior: response.data.social_media || [],
      contentConsumption: response.data.content_types || [],
      brandAffinities: response.data.brand_affinities || []
    };
  }

  private static async generateCulturalInsightsWithAI(businessInfo: BusinessInfo): Promise<TasteProfile> {
    const prompt = `
    As a cultural intelligence expert, analyze the following business information and generate a detailed cultural taste profile for their target audience:

    Business: ${businessInfo.productDescription}
    Industry: ${businessInfo.industry}
    Target Age: ${businessInfo.targetAudience.ageRange || 'Not specified'}
    Location: ${businessInfo.targetAudience.location || 'Global'}
    Interests: ${businessInfo.targetAudience.interests.join(', ') || 'General'}
    Brand References: ${businessInfo.brandReferences.join(', ') || 'None specified'}
    
Return ONLY a valid JSON object in the following format, with no commentary or explanation:
    
    {
      "musicGenres": ["genre1", "genre2", "genre3"],
      "entertainmentPreferences": ["pref1", "pref2", "pref3"],
      "lifestyleChoices": ["choice1", "choice2", "choice3"],
      "socialMediaBehavior": ["behavior1", "behavior2", "behavior3"],
      "contentConsumption": ["type1", "type2", "type3"],
      "brandAffinities": ["brand1", "brand2", "brand3"]
    }

    Base your analysis on current cultural trends, demographic data, and the specific industry context.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Invalid AI response format');
    }
  }

  static async generateMarketingStrategy(
    businessInfo: BusinessInfo, 
    tasteProfile: TasteProfile
  ): Promise<MarketingStrategy> {
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here') {
        console.warn('OpenAI API key not configured, using mock data');
        return this.getMockMarketingStrategy(businessInfo, tasteProfile);
      }

      const prompt = `
      As a senior marketing strategist, create a comprehensive marketing strategy based on the following information:

      BUSINESS INFORMATION:
      Product/Service: ${businessInfo.productDescription}
      Industry: ${businessInfo.industry}
      Target Audience: ${businessInfo.targetAudience.ageRange} in ${businessInfo.targetAudience.location}
      Interests: ${businessInfo.targetAudience.interests.join(', ')}
      Brand References: ${businessInfo.brandReferences.join(', ')}
      Current Marketing: ${businessInfo.currentMarketing.join(', ')}
      Budget: ${businessInfo.budget}
      Goals: ${businessInfo.goals.join(', ')}

      CULTURAL TASTE PROFILE:
      Music: ${tasteProfile.musicGenres.join(', ')}
      Entertainment: ${tasteProfile.entertainmentPreferences.join(', ')}
      Lifestyle: ${tasteProfile.lifestyleChoices.join(', ')}
      Social Media: ${tasteProfile.socialMediaBehavior.join(', ')}
      Content: ${tasteProfile.contentConsumption.join(', ')}
      Brand Affinities: ${tasteProfile.brandAffinities.join(', ')}

      Generate a comprehensive marketing strategy in the following JSON format:
      {
        "brandMessaging": {
          "taglines": ["tagline1", "tagline2", "tagline3", "tagline4"],
          "valuePropositions": ["prop1", "prop2", "prop3"],
          "brandVoice": "description of brand voice and tone"
        },
        "contentCalendar": [
          {
            "week": 1,
            "platform": "Instagram",
            "contentType": "Educational Post",
            "title": "Week 1 Content Title",
            "description": "Detailed description",
            "hashtags": ["#tag1", "#tag2", "#tag3"],
            "bestPostTime": "2:00 PM"
          }
        ],
        "channels": [
          {
            "platform": "Instagram",
            "priority": "high",
            "reasoning": "Why this platform is recommended",
            "contentTypes": ["Stories", "Reels", "Posts"],
            "budget": "$1,500-3,000/month",
            "expectedROI": "250-400%"
          }
        ],
        "influencerStrategy": {
          "tierRecommendations": [
            {
              "tier": "Micro-Influencers",
              "followerRange": "1K-10K",
              "budget": "$500-2,000/month",
              "outreachTemplate": "Personalized outreach message template"
            }
          ],
          "platformFocus": ["Instagram", "TikTok", "YouTube"],
          "collaborationTypes": ["Product Reviews", "Tutorials", "Takeovers"]
        },
        "adScripts": [
          {
            "platform": "TikTok",
            "duration": "30 seconds",
            "script": "Detailed script with timing",
            "hooks": ["hook1", "hook2", "hook3"],
            "cta": "Call to action"
          }
        ]
      }

      Generate 24 content calendar items (6 weeks × 4 platforms), 3-4 channel recommendations, and 2-3 ad scripts for different platforms. Make all recommendations specific, actionable, and aligned with the cultural taste profile. Focus on practical implementation rather than generic advice. Ensure the response is valid JSON without any comments.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      });

      const responseText = completion.choices[0].message.content;
      if (!responseText) {
        throw new Error('No response from OpenAI');
      }

      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        throw new Error('Invalid AI response format');
      }
    } catch (error) {
      console.error('Error generating marketing strategy:', error);
      // Fallback to mock data if AI service fails
      return this.getMockMarketingStrategy(businessInfo, tasteProfile);
    }
  }

  // Fallback methods for when AI services are unavailable
  private static getMockCulturalData(businessInfo: BusinessInfo): TasteProfile {
    const industryProfiles: Record<string, Partial<TasteProfile>> = {
      technology: {
        musicGenres: ['Electronic', 'Indie Rock', 'Lo-fi Hip Hop'],
        entertainmentPreferences: ['Tech Podcasts', 'Documentary Films', 'Gaming Streams'],
        lifestyleChoices: ['Remote Work', 'Minimalism', 'Fitness Tech'],
        socialMediaBehavior: ['Twitter Early Adopters', 'LinkedIn Thought Leaders', 'Reddit Communities'],
        contentConsumption: ['Long-form Articles', 'YouTube Tutorials', 'Technical Blogs'],
        brandAffinities: ['Apple', 'Tesla', 'Notion']
      },
      fashion: {
        musicGenres: ['Pop', 'R&B', 'Indie Pop'],
        entertainmentPreferences: ['Fashion Shows', 'Celebrity News', 'Style Vlogs'],
        lifestyleChoices: ['Sustainable Fashion', 'Travel', 'Photography'],
        socialMediaBehavior: ['Instagram Visual Content', 'TikTok Trends', 'Pinterest Inspiration'],
        contentConsumption: ['Visual Stories', 'Influencer Content', 'Style Guides'],
        brandAffinities: ['Zara', 'Nike', 'Glossier']
      },
      food: {
        musicGenres: ['Jazz', 'World Music', 'Acoustic'],
        entertainmentPreferences: ['Cooking Shows', 'Food Documentaries', 'Travel Content'],
        lifestyleChoices: ['Local Sourcing', 'Health Conscious', 'Cultural Exploration'],
        socialMediaBehavior: ['Instagram Food Photos', 'YouTube Recipes', 'Facebook Community Groups'],
        contentConsumption: ['Recipe Videos', 'Food Blogs', 'Restaurant Reviews'],
        brandAffinities: ['Blue Apron', 'Whole Foods', 'HelloFresh']
      }
    };

    return {
      musicGenres: industryProfiles[businessInfo.industry]?.musicGenres || ['Pop', 'Rock', 'Electronic'],
      entertainmentPreferences: industryProfiles[businessInfo.industry]?.entertainmentPreferences || ['Streaming Shows', 'Podcasts', 'Social Media'],
      lifestyleChoices: industryProfiles[businessInfo.industry]?.lifestyleChoices || ['Health & Wellness', 'Technology', 'Sustainability'],
      socialMediaBehavior: industryProfiles[businessInfo.industry]?.socialMediaBehavior || ['Instagram Stories', 'TikTok Videos', 'YouTube Content'],
      contentConsumption: industryProfiles[businessInfo.industry]?.contentConsumption || ['Video Content', 'Articles', 'Social Posts'],
      brandAffinities: industryProfiles[businessInfo.industry]?.brandAffinities || ['Apple', 'Nike', 'Google']
    };
  }

  private static getMockMarketingStrategy(businessInfo: BusinessInfo, tasteProfile: TasteProfile): MarketingStrategy {
    return {
      brandMessaging: {
        taglines: [
          `Revolutionizing ${businessInfo.industry} for the modern ${businessInfo.targetAudience.ageRange}`,
          `Where innovation meets ${businessInfo.industry}`,
          `Your trusted partner in ${businessInfo.industry} excellence`,
          `Empowering your ${businessInfo.industry} journey`
        ],
        valuePropositions: [
          `Seamlessly integrate cutting-edge solutions into your ${businessInfo.industry} workflow`,
          `Experience unparalleled quality and innovation in every interaction`,
          `Join thousands of satisfied customers transforming their ${businessInfo.industry} experience`
        ],
        brandVoice: `Professional yet approachable, innovative and trustworthy, with a focus on ${tasteProfile.lifestyleChoices[0]?.toLowerCase()}`
      },
      contentCalendar: this.generateMockContentCalendar(businessInfo, tasteProfile),
      channels: this.generateMockChannelRecommendations(tasteProfile),
      influencerStrategy: {
        tierRecommendations: [
          {
            tier: 'Micro-Influencers',
            followerRange: '1K-10K',
            budget: '$500-2,000/month',
            outreachTemplate: `Hi [Name]! We love your content about ${tasteProfile.entertainmentPreferences[0]?.toLowerCase()}. Would you be interested in partnering with us to showcase our ${businessInfo.industry} solution?`
          },
          {
            tier: 'Mid-Tier Influencers',
            followerRange: '10K-100K',
            budget: '$2,000-10,000/month',
            outreachTemplate: `Hello [Name], we've been following your journey in the ${businessInfo.industry} space and would love to collaborate on an authentic partnership that aligns with your values.`
          }
        ],
        platformFocus: tasteProfile.socialMediaBehavior.slice(0, 3),
        collaborationTypes: ['Product Reviews', 'Behind-the-Scenes Content', 'Tutorial Videos', 'Story Takeovers']
      },
      adScripts: this.generateMockAdScripts(businessInfo, tasteProfile)
    };
  }

  private static generateMockContentCalendar(businessInfo: BusinessInfo, tasteProfile: TasteProfile) {
    const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'YouTube'];
    const contentTypes = ['Educational Post', 'Behind-the-Scenes', 'User-Generated Content', 'Product Showcase', 'Industry Insights'];
    
    return Array.from({ length: 24 }, (_, i) => ({
      week: Math.floor(i / 4) + 1,
      platform: platforms[i % platforms.length],
      contentType: contentTypes[i % contentTypes.length],
      title: `Week ${Math.floor(i / 4) + 1}: ${contentTypes[i % contentTypes.length]} for ${businessInfo.industry}`,
      description: `Engage your audience with ${contentTypes[i % contentTypes.length].toLowerCase()} that resonates with their ${tasteProfile.lifestyleChoices[0]?.toLowerCase()} values`,
      hashtags: [`#${businessInfo.industry}`, '#Innovation', '#Quality', `#${tasteProfile.lifestyleChoices[0]?.replace(/\s+/g, '')}`],
      bestPostTime: i % 2 === 0 ? '2:00 PM' : '7:00 PM'
    }));
  }

  private static generateMockChannelRecommendations(tasteProfile: TasteProfile) {
    return [
      {
        platform: 'Instagram',
        priority: 'high' as const,
        reasoning: `Perfect for visual storytelling and reaches your audience who enjoys ${tasteProfile.entertainmentPreferences[0]?.toLowerCase()}`,
        contentTypes: ['Stories', 'Reels', 'IGTV', 'Carousel Posts'],
        budget: '$1,500-3,000/month',
        expectedROI: '250-400%'
      },
      {
        platform: 'TikTok',
        priority: 'high' as const,
        reasoning: 'High engagement rates with trending content formats',
        contentTypes: ['Short Videos', 'Challenges', 'Tutorials', 'Behind-the-Scenes'],
        budget: '$1,000-2,500/month',
        expectedROI: '300-500%'
      },
      {
        platform: 'LinkedIn',
        priority: 'medium' as const,
        reasoning: 'Professional network ideal for B2B engagement',
        contentTypes: ['Articles', 'Industry Insights', 'Company Updates', 'Thought Leadership'],
        budget: '$800-2,000/month',
        expectedROI: '150-250%'
      }
    ];
  }

  private static generateMockAdScripts(businessInfo: BusinessInfo, tasteProfile: TasteProfile) {
    return [
      {
        platform: 'TikTok',
        duration: '30 seconds',
        script: `[Hook: 3 seconds] "This changed everything about my ${businessInfo.industry} game..." [Problem: 10 seconds] Show the common frustration your audience faces [Solution: 12 seconds] Demonstrate your product in action [CTA: 5 seconds] "Link in bio to transform your ${businessInfo.industry} experience!"`,
        hooks: [
          `POV: You discover the ${businessInfo.industry} hack everyone's talking about`,
          `This ${businessInfo.industry} secret will blow your mind`,
          `Why I'll never go back to traditional ${businessInfo.industry} methods`
        ],
        cta: 'Link in bio for exclusive access!'
      },
      {
        platform: 'Instagram',
        duration: '60 seconds',
        script: `[Opening: 5 seconds] Visual hook showcasing transformation [Story: 35 seconds] Share customer success story with voiceover [Product demo: 15 seconds] Quick feature highlights [CTA: 5 seconds] "Swipe up to start your journey"`,
        hooks: [
          'The before and after that shocked everyone',
          `How [Customer Name] revolutionized their ${businessInfo.industry} approach`,
          'The transformation you need to see'
        ],
        cta: 'Swipe up to get started today!'
      }
    ];
  }
}