import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-dark-green-600 to-dark-green-800 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Marketly</h1>
              <p className="text-sm text-gray-300">Understand Your Audience Better Than Ever Before</p>
            </div>
          </div>
          
          {currentStep && totalSteps && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-dark-green-500 to-dark-green-700 h-2 rounded-full transition-all duration-300"
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