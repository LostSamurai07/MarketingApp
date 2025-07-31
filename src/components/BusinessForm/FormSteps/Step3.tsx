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
        <label htmlFor="budget" className="block text-sm font-medium text-gray-200 mb-2">
          Marketing Budget Range
        </label>
        <select
          id="budget"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-dark-green-500 focus:border-transparent transition-all duration-200"
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
        <label className="block text-sm font-medium text-gray-200 mb-3">
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
                  ? 'bg-dark-green-600 text-white border-dark-green-600 shadow-md'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-dark-green-500 hover:bg-dark-green-900'
                }
              `}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-green-900 border border-dark-green-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-dark-green-400 mb-2">Ready to Generate Your Strategy?</h3>
        <p className="text-dark-green-300 text-sm">
          We'll analyze your business information using advanced AI and cultural intelligence to create 
          a personalized marketing strategy with actionable recommendations, content calendars, and growth tactics.
        </p>
      </div>
    </div>
  );
};