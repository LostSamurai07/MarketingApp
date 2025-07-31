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
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
      }}
    >
      <div className="text-center space-y-8 p-8">
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-dark-green-600 to-dark-green-800 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
              {React.createElement(loadingSteps[currentStep].icon, {
                className: "w-8 h-8 text-dark-green-400"
              })}
            </div>
          </div>
          
          <div className="absolute -inset-4 opacity-30">
            <div className="w-32 h-32 border-4 border-dark-green-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Creating Your Marketing Strategy
          </h2>
          <p className="text-lg text-gray-200 max-w-md mx-auto">
            {loadingSteps[currentStep].text}
          </p>
        </div>

        <div className="w-80 mx-auto">
          <div className="bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-dark-green-500 to-dark-green-700 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2">{Math.round(progress)}% complete</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm text-gray-300">
          {loadingSteps.map((step, index) => (
            <div 
              key={index}
              className={`
                flex items-center space-x-2 p-2 rounded-lg transition-all duration-200
                ${index <= currentStep ? 'bg-dark-green-900 text-dark-green-300' : 'text-gray-500'}
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