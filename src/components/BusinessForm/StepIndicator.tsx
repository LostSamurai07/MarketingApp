import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                ${isCompleted ? 'bg-dark-green-600 border-dark-green-600 text-white' : 
                  isCurrent ? 'bg-dark-green-500 border-dark-green-500 text-white' : 
                  'bg-gray-700 border-gray-600 text-gray-400'}
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  h-0.5 w-16 mx-4 transition-all duration-200
                  ${isCompleted ? 'bg-dark-green-600' : 'bg-gray-600'}
                `} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-white">{steps[currentStep - 1]}</h2>
        <p className="text-gray-300 mt-2">
          {currentStep === 1 && "Tell us about your business and what you're offering"}
          {currentStep === 2 && "Help us understand your target audience"}
          {currentStep === 3 && "What are your marketing goals and current efforts?"}
        </p>
      </div>
    </div>
  );
};