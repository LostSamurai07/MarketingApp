import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MarketingAI</h1>
              <p className="text-sm text-gray-500">Powered by Cultural Intelligence</p>
            </div>
          </div>
          
          {currentStep && totalSteps && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};