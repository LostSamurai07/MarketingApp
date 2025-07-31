import React from 'react';
import { BusinessInfo } from '../../../types';

interface Step2Props {
  formData: BusinessInfo;
  updateFormData: (data: Partial<BusinessInfo>) => void;
}

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
const commonInterests = [
  'Technology', 'Fashion', 'Health & Fitness', 'Travel', 'Food', 'Music',
  'Movies & TV', 'Sports', 'Gaming', 'Art & Design', 'Education', 'Business',
  'Sustainability', 'Photography', 'Books', 'Cooking'
];

export const Step2: React.FC<Step2Props> = ({ formData, updateFormData }) => {
  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.targetAudience.interests;
    let newInterests;
    
    if (currentInterests.includes(interest)) {
      newInterests = currentInterests.filter(i => i !== interest);
    } else {
      newInterests = [...currentInterests, interest];
    }
    
    updateFormData({
      targetAudience: {
        ...formData.targetAudience,
        interests: newInterests
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="ageRange" className="block text-sm font-medium text-gray-200 mb-2">
          Primary Age Range
        </label>
        <select
          id="ageRange"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-dark-green-500 focus:border-transparent transition-all duration-200"
          value={formData.targetAudience.ageRange}
          onChange={(e) => updateFormData({
            targetAudience: { ...formData.targetAudience, ageRange: e.target.value }
          })}
        >
          <option value="">Select age range</option>
          {ageRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-2">
          Target Location
        </label>
        <input
          type="text"
          id="location"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-dark-green-500 focus:border-transparent transition-all duration-200"
          placeholder="e.g., United States, Europe, Global"
          value={formData.targetAudience.location}
          onChange={(e) => updateFormData({
            targetAudience: { ...formData.targetAudience, location: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">
          Target Audience Interests (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {commonInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`
                px-4 py-2 text-sm rounded-lg border transition-all duration-200
                ${formData.targetAudience.interests.includes(interest)
                  ? 'bg-dark-green-600 text-white border-dark-green-600 shadow-md'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-dark-green-500 hover:bg-dark-green-900'
                }
              `}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Brand References (Up to 3 brands you admire)
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-dark-green-500 focus:border-transparent transition-all duration-200"
              placeholder={`Brand ${index + 1}`}
              value={formData.brandReferences[index] || ''}
              onChange={(e) => {
                const newReferences = [...formData.brandReferences];
                newReferences[index] = e.target.value;
                updateFormData({ brandReferences: newReferences.filter(Boolean) });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};