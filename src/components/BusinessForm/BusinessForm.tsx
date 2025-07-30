import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BusinessInfo } from '../../types';
import { StepIndicator } from './StepIndicator';
import { Step1 } from './FormSteps/Step1';
import { Step2 } from './FormSteps/Step2';
import { Step3 } from './FormSteps/Step3';

interface BusinessFormProps {
  onSubmit: (data: BusinessInfo) => void;
}

const initialFormData: BusinessInfo = {
  productDescription: '',
  industry: '',
  targetAudience: {
    ageRange: '',
    location: '',
    interests: []
  },
  brandReferences: [],
  currentMarketing: [],
  budget: '',
  goals: []
};

const steps = ['Business Details', 'Target Audience', 'Goals & Budget'];

export const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessInfo>(initialFormData);

  const updateFormData = (data: Partial<BusinessInfo>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.productDescription.trim() && formData.industry;
      case 2:
        return true; // All fields optional in step 2
      case 3:
        return true; // All fields optional in step 3
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      onSubmit(formData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          steps={steps}
        />
        
        <div className="min-h-[400px]">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200
                ${canProceed()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`
                px-8 py-3 rounded-lg font-medium transition-all duration-200
                ${canProceed()
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Generate Strategy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};