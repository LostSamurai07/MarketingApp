import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Target, TrendingUp } from 'lucide-react';

const loadingSteps = [
  { icon: Brain, text: 'Analyzing your business profile', duration: 2000 },
  { icon: Target, text: 'Mapping cultural preferences', duration: 2500 },
  { icon: TrendingUp, text: 'Identifying optimal channels', duration: 2000 },
  { icon: Sparkles, text: 'Generating your strategy', duration: 1500 }
];

export const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      let cumulativeDuration = 0;
      for (let i = 0; i < loadingSteps.length; i++) {
        cumulativeDuration += loadingSteps[i].duration;
        if (elapsed <= cumulativeDuration) {
          setCurrentStep(i);
          break;
        }
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              {React.createElement(loadingSteps[currentStep].icon, {
                className: "w-8 h-8 text-blue-600"
              })}
            </div>
          </div>
          
          <div className="absolute -inset-4 opacity-30">
            <div className="w-32 h-32 border-4 border-blue-200 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Creating Your Marketing Strategy
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {loadingSteps[currentStep].text}
          </p>
        </div>

        <div className="w-80 mx-auto">
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% complete</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm text-gray-600">
          {loadingSteps.map((step, index) => (
            <div 
              key={index}
              className={`
                flex items-center space-x-2 p-2 rounded-lg transition-all duration-200
                ${index <= currentStep ? 'bg-blue-50 text-blue-700' : 'text-gray-400'}
              `}
            >
              {React.createElement(step.icon, { className: "w-4 h-4" })}
              <span className="text-xs">{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};