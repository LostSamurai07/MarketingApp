import React from 'react';
import { BusinessInfo } from '../../../types';

interface Step3Props {
  formData: BusinessInfo;
  updateFormData: (data: Partial<BusinessInfo>) => void;
}

const budgetRanges = [
  'Under $1,000/month',
  '$1,000 - $5,000/month',
  '$5,000 - $15,000/month',
  '$15,000 - $50,000/month',
  'Over $50,000/month'
];

const marketingGoals = [
  'Increase Brand Awareness',
  'Generate More Leads',
  'Increase Sales Revenue',
  'Improve Customer Engagement',
  'Enter New Markets',
  'Launch New Product/Service',
  'Build Community',
  'Improve Online Reputation'
];

export const Step3: React.FC<Step3Props> = ({ formData, updateFormData }) => {
  const handleGoalToggle = (goal: string) => {
    const currentGoals = formData.goals;
    let newGoals;
    
    if (currentGoals.includes(goal)) {
      newGoals = currentGoals.filter(g => g !== goal);
    } else {
      newGoals = [...currentGoals, goal];
    }
    
    updateFormData({ goals: newGoals });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
          Marketing Budget Range
        </label>
        <select
          id="budget"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={formData.budget}
          onChange={(e) => updateFormData({ budget: e.target.value })}
        >
          <option value="">Select budget range</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Primary Marketing Goals (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {marketingGoals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleGoalToggle(goal)}
              className={`
                px-4 py-3 text-sm text-left rounded-lg border transition-all duration-200
                ${formData.goals.includes(goal)
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }
              `}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to Generate Your Strategy?</h3>
        <p className="text-blue-700 text-sm">
          We'll analyze your business information using advanced AI and cultural intelligence to create 
          a personalized marketing strategy with actionable recommendations, content calendars, and growth tactics.
        </p>
      </div>
    </div>
  );
};