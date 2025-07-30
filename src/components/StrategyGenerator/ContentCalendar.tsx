import React, { useState } from 'react';
import { Calendar, Filter, TrendingUp } from 'lucide-react';
import { ContentCalendarItem } from '../../types';

interface ContentCalendarProps {
  calendar: ContentCalendarItem[];
}

export const ContentCalendar: React.FC<ContentCalendarProps> = ({ calendar }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

  const platforms = Array.from(new Set(calendar.map(item => item.platform)));
  const weeks = Array.from(new Set(calendar.map(item => item.week))).sort((a, b) => a - b);

  const filteredCalendar = calendar.filter(item => {
    const platformMatch = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const weekMatch = selectedWeek === 0 || item.week === selectedWeek;
    return platformMatch && weekMatch;
  });

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      'Instagram': 'bg-pink-500',
      'TikTok': 'bg-black',
      'LinkedIn': 'bg-blue-600',
      'YouTube': 'bg-red-500',
      'Twitter': 'bg-blue-400',
      'Facebook': 'bg-blue-700'
    };
    return colors[platform] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Content Calendar</h2>
            <p className="text-gray-600">6-week strategic content plan</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={0}>All Weeks</option>
            {weeks.map(week => (
              <option key={week} value={week}>Week {week}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalendar.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`${getPlatformColor(item.platform)} px-3 py-1 rounded-full`}>
                  <span className="text-white text-xs font-medium">{item.platform}</span>
                </div>
                <span className="text-sm text-gray-500">Week {item.week}</span>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Content Type</span>
                <p className="text-sm text-gray-700">{item.contentType}</p>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Best Post Time</span>
                <p className="text-sm text-gray-700">{item.bestPostTime}</p>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hashtags</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.hashtags.map((hashtag, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Calendar Optimization Tips</h3>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>• Post consistently at optimal times for maximum engagement</li>
          <li>• Mix content types to keep your audience engaged</li>
          <li>• Track performance metrics and adjust timing based on results</li>
          <li>• Prepare content in advance using scheduling tools</li>
        </ul>
      </div>
    </div>
  );
};