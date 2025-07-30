import React, { useState } from 'react';
import { Users, Copy, Check, Send } from 'lucide-react';
import { InfluencerStrategy as InfluencerStrategyType } from '../../types';

interface InfluencerStrategyProps {
  strategy: InfluencerStrategyType;
}

export const InfluencerStrategy: React.FC<InfluencerStrategyProps> = ({ strategy }) => {
  const [copiedTemplates, setCopiedTemplates] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplates(prev => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedTemplates(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-xl">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Influencer Strategy</h2>
          <p className="text-gray-600">Partnership recommendations and outreach templates</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Influencer Tier Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategy.tierRecommendations.map((tier, index) => (
              <div 
                key={tier.tier}
                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{tier.tier}</h4>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tier.followerRange}
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">Budget Range</span>
                  <p className="text-lg font-semibold text-gray-900">{tier.budget}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Outreach Template</span>
                    <button
                      onClick={() => copyToClipboard(tier.outreachTemplate, `template-${index}`)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {copiedTemplates.has(`template-${index}`) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed">{tier.outreachTemplate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Focus</h3>
            <div className="space-y-3">
              {strategy.platformFocus.map((platform, index) => (
                <div 
                  key={platform}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900">{platform}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration Types</h3>
            <div className="grid grid-cols-2 gap-3">
              {strategy.collaborationTypes.map((type, index) => (
                <div 
                  key={type}
                  className="bg-purple-100 text-purple-700 px-4 py-3 rounded-lg text-center text-sm font-medium"
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-2 mb-3">
            <Send className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Outreach Best Practices</h3>
          </div>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>• Research the influencer's content and engagement before reaching out</li>
            <li>• Personalize each message and mention specific content you enjoyed</li>
            <li>• Be clear about compensation and deliverables upfront</li>
            <li>• Start with micro-influencers for better engagement rates and authenticity</li>
            <li>• Track campaign performance and build long-term relationships</li>
          </ul>
        </div>
      </div>
    </div>
  );
};