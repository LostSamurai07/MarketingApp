import React from 'react';
import { TrendingUp, DollarSign, Target, Star } from 'lucide-react';
import { RecommendedChannel } from '../../types';

interface ChannelRecommendationsProps {
  channels: RecommendedChannel[];
}

export const ChannelRecommendations: React.FC<ChannelRecommendationsProps> = ({ channels }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Recommended Channels</h2>
          <p className="text-gray-600">Prioritized marketing channels for your strategy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {channels.map((channel, index) => (
          <div 
            key={channel.platform}
            className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{channel.platform}</h3>
              <div className={`${getPriorityColor(channel.priority)} px-3 py-1 rounded-full`}>
                <span className="text-white text-sm font-medium">
                  {getPriorityText(channel.priority)} Priority
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{channel.reasoning}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Budget</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{channel.budget}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Expected ROI</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{channel.expectedROI}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Recommended Content Types</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {channel.contentTypes.map((type, typeIndex) => (
                  <span 
                    key={typeIndex}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Channel Strategy Tips</h3>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>• Start with high-priority channels and scale gradually</li>
          <li>• Maintain consistent branding across all platforms</li>
          <li>• Test different content formats to find what resonates</li>
          <li>• Monitor ROI closely and reallocate budget based on performance</li>
        </ul>
      </div>
    </div>
  );
};