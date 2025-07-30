import React, { useState } from 'react';
import { Video, Copy, Check, Play, Clock } from 'lucide-react';
import { AdScript } from '../../types';

interface AdScriptsProps {
  scripts: AdScript[];
}

export const AdScripts: React.FC<AdScriptsProps> = ({ scripts }) => {
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

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      'TikTok': 'from-black to-gray-800',
      'Instagram': 'from-purple-500 to-pink-500',
      'YouTube': 'from-red-500 to-red-600',
      'Facebook': 'from-blue-600 to-blue-700'
    };
    return colors[platform] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-xl">
          <Video className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Ad Scripts</h2>
          <p className="text-gray-600">Platform-optimized video ad scripts</p>
        </div>
      </div>

      <div className="space-y-8">
        {scripts.map((script, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${getPlatformColor(script.platform)} px-4 py-2 rounded-lg`}>
                  <span className="text-white font-semibold">{script.platform}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{script.duration}</span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(script.script, `script-${index}`)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {copiedItems.has(`script-${index}`) ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Play className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">Full Script</h4>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{script.script}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Hook Variations</h4>
                <div className="space-y-3">
                  {script.hooks.map((hook, hookIndex) => (
                    <div 
                      key={hookIndex}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700 text-sm flex-1 mr-2">{hook}</p>
                        <button
                          onClick={() => copyToClipboard(hook, `hook-${index}-${hookIndex}`)}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                          {copiedItems.has(`hook-${index}-${hookIndex}`) ? (
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
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Call-to-Action</h4>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-medium flex-1 mr-2">{script.cta}</p>
                    <button
                      onClick={() => copyToClipboard(script.cta, `cta-${index}`)}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200"
                    >
                      {copiedItems.has(`cta-${index}`) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Video Ad Best Practices</h3>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>• Hook viewers within the first 3 seconds to prevent scrolling</li>
          <li>• Use captions since many users watch videos with sound off</li>
          <li>• Include your product or service within the first 5 seconds</li>
          <li>• Test multiple hooks and CTAs to optimize performance</li>
          <li>• Keep the script natural and conversational for authenticity</li>
        </ul>
      </div>
    </div>
  );
};