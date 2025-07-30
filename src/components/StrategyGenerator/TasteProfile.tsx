import React from 'react';
import { Music, Tv, Heart, Users, FileText, Star } from 'lucide-react';
import { TasteProfile as TasteProfileType } from '../../types';

interface TasteProfileProps {
  profile: TasteProfileType;
}

export const TasteProfile: React.FC<TasteProfileProps> = ({ profile }) => {
  const sections = [
    { title: 'Music Preferences', items: profile.musicGenres, icon: Music, color: 'bg-pink-500' },
    { title: 'Entertainment', items: profile.entertainmentPreferences, icon: Tv, color: 'bg-purple-500' },
    { title: 'Lifestyle Choices', items: profile.lifestyleChoices, icon: Heart, color: 'bg-red-500' },
    { title: 'Social Media Behavior', items: profile.socialMediaBehavior, icon: Users, color: 'bg-blue-500' },
    { title: 'Content Consumption', items: profile.contentConsumption, icon: FileText, color: 'bg-green-500' },
    { title: 'Brand Affinities', items: profile.brandAffinities, icon: Star, color: 'bg-yellow-500' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cultural Taste Profile</h2>
        <p className="text-gray-600">Deep insights into your target audience's preferences and behaviors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div key={section.title} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${section.color} p-2 rounded-lg`}>
                {React.createElement(section.icon, { className: "w-5 h-5 text-white" })}
              </div>
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
            </div>
            
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={item}
                  className="bg-white px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Insights</h3>
        <ul className="text-gray-700 space-y-1 text-sm">
          <li>• Your audience values {profile.lifestyleChoices[0]?.toLowerCase()} and authentic experiences</li>
          <li>• They primarily engage through {profile.socialMediaBehavior[0]?.toLowerCase()}</li>
          <li>• Content should align with {profile.entertainmentPreferences[0]?.toLowerCase()} preferences</li>
          <li>• Brand associations with {profile.brandAffinities.slice(0, 2).join(' and ')} resonate strongly</li>
        </ul>
      </div>
    </div>
  );
};