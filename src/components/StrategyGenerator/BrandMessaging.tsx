import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Lightbulb } from 'lucide-react';
import { MarketingStrategy } from '../../types';

interface BrandMessagingProps {
  messaging: MarketingStrategy['brandMessaging'];
}

export const BrandMessaging: React.FC<BrandMessagingProps> = ({ messaging }) => {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedItems(prev => {
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
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Brand Messaging</h2>
          <p className="text-gray-600">Your brand voice and key messages</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Tagline Options</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messaging.taglines.map((tagline, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <p className="text-gray-800 font-medium flex-1 mr-2">{tagline}</p>
                  <button
                    onClick={() => copyToClipboard(tagline, `tagline-${index}`)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {copiedItems.has(`tagline-${index}`) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Value Propositions</h3>
          <div className="space-y-4">
            {messaging.valuePropositions.map((proposition, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <p className="text-gray-700 flex-1 mr-2">{proposition}</p>
                  <button
                    onClick={() => copyToClipboard(proposition, `value-${index}`)}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {copiedItems.has(`value-${index}`) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Brand Voice Guidelines</h3>
          <p className="text-gray-700 leading-relaxed">{messaging.brandVoice}</p>
        </div>
      </div>
    </div>
  );
};