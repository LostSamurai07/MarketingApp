import React, { useState } from 'react';
import { Download, Share, ArrowLeft } from 'lucide-react';
import { BusinessInfo, TasteProfile as TasteProfileType, MarketingStrategy } from '../../types';
import { TasteProfile } from './TasteProfile';
import { BrandMessaging } from './BrandMessaging';
import { ContentCalendar } from './ContentCalendar';
import { ChannelRecommendations } from './ChannelRecommendations';
import { InfluencerStrategy } from './InfluencerStrategy';
import { AdScripts } from './AdScripts';

interface StrategyResultsProps {
  businessInfo: BusinessInfo;
  tasteProfile: TasteProfileType;
  strategy: MarketingStrategy;
  onBack: () => void;
}

const sections = [
  { id: 'taste-profile', name: 'Cultural Profile', component: TasteProfile },
  { id: 'brand-messaging', name: 'Brand Messaging', component: BrandMessaging },
  { id: 'content-calendar', name: 'Content Calendar', component: ContentCalendar },
  { id: 'channels', name: 'Channel Strategy', component: ChannelRecommendations },
  { id: 'influencers', name: 'Influencer Strategy', component: InfluencerStrategy },
  { id: 'ad-scripts', name: 'Ad Scripts', component: AdScripts }
];

export const StrategyResults: React.FC<StrategyResultsProps> = ({ 
  businessInfo, 
  tasteProfile, 
  strategy, 
  onBack 
}) => {
  const [activeSection, setActiveSection] = useState('taste-profile');

  const renderSection = () => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return null;

    const Component = section.component;
    
    switch (activeSection) {
      case 'taste-profile':
        return <Component profile={tasteProfile} />;
      case 'brand-messaging':
        return <Component messaging={strategy.brandMessaging} />;
      case 'content-calendar':
        return <Component calendar={strategy.contentCalendar} />;
      case 'channels':
        return <Component channels={strategy.channels} />;
      case 'influencers':
        return <Component strategy={strategy.influencerStrategy} />;
      case 'ad-scripts':
        return <Component scripts={strategy.adScripts} />;
      default:
        return null;
    }
  };

  const handleExport = () => {
    // In a real app, this would generate and download a PDF report
    alert('Export functionality would generate a comprehensive PDF report with all strategy elements.');
  };

  const handleShare = () => {
    // In a real app, this would create a shareable link or email
    alert('Share functionality would create a secure link to share your strategy with team members.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Form</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200
                  ${activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </div>
    </div>
  );
};