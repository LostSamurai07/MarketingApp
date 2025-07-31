import React from 'react';
import { BusinessInfo } from '../../../types';

interface Step1Props {
  formData: BusinessInfo;
  updateFormData: (data: Partial<BusinessInfo>) => void;
}

const industries = [
  'Technology', 'Fashion', 'Food & Beverage', 'Healthcare', 'Education',
  'Real Estate', 'Finance', 'Travel', 'Beauty & Wellness', 'Entertainment',
  'Sports & Fitness', 'Home & Garden', 'Automotive', 'Professional Services'
];

export const Step1: React.FC<Step1Props> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-200 mb-2">
          Product/Service Description *
        </label>
        <textarea
          id="productDescription"
          rows={4}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-dark-green-500 focus:border-transparent transition-all duration-200"
          placeholder="Describe what your business offers, who it's for, and what makes it unique..."
          value={formData.productDescription}
          onChange={(e) => updateFormData({ productDescription: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-200 mb-2">
          Industry *
        </label>
        <select
          id="industry"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-dark-green-500 focus:border-transparent transition-all duration-200"
          value={formData.industry}
          onChange={(e) => updateFormData({ industry: e.target.value })}
          required
        >
          <option value="">Select your industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry.toLowerCase()}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Current Marketing Channels
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Social Media', 'Email Marketing', 'Content Marketing', 'Paid Ads', 'SEO', 'Influencer Marketing', 'PR', 'Events'].map((channel) => (
            <label key={channel} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-600 bg-gray-700 text-dark-green-600 focus:ring-dark-green-500"
                checked={formData.currentMarketing.includes(channel)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData({ currentMarketing: [...formData.currentMarketing, channel] });
                  } else {
                    updateFormData({ 
                      currentMarketing: formData.currentMarketing.filter(c => c !== channel) 
                    });
                  }
                }}
              />
              <span className="text-sm text-gray-300">{channel}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};