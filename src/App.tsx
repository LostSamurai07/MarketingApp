import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { BusinessForm } from './components/BusinessForm/BusinessForm';
import { LoadingScreen } from './components/StrategyGenerator/LoadingScreen';
import { StrategyResults } from './components/StrategyGenerator/StrategyResults';
import { BusinessInfo, TasteProfile, MarketingStrategy } from './types';
import { MarketingAPIService } from './services/api';

type AppState = 'form' | 'loading' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('form');
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(null);
  const [marketingStrategy, setMarketingStrategy] = useState<MarketingStrategy | null>(null);

  const handleFormSubmit = async (formData: BusinessInfo) => {
    setBusinessInfo(formData);
    setCurrentState('loading');

    try {
      // Analyze cultural taste profile
      const profile = await MarketingAPIService.analyzeCulturalTaste(formData);
      setTasteProfile(profile);

      // Generate marketing strategy
      const strategy = await MarketingAPIService.generateMarketingStrategy(formData, profile);
      setMarketingStrategy(strategy);

      setCurrentState('results');
    } catch (error) {
      console.error('Error generating strategy:', error);
      // In a real app, show error state
      setCurrentState('form');
    }
  };

  const handleBackToForm = () => {
    setCurrentState('form');
  };

  if (currentState === 'loading') {
    return <LoadingScreen />;
  }

  if (currentState === 'results' && businessInfo && tasteProfile && marketingStrategy) {
    return (
      <StrategyResults
        businessInfo={businessInfo}
        tasteProfile={tasteProfile}
        strategy={marketingStrategy}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header currentStep={1} totalSteps={3} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Marketing Strategy Generator Powered By Cultural Intelligence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your marketing approach with AI-driven insights based on cultural intelligence. 
            Get personalized strategies, content calendars, viral post generators and actionable recommendations to build up your business!
          </p>
        </div>

        <BusinessForm onSubmit={handleFormSubmit} />

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Analysis</h3>
              <p className="text-gray-600 text-sm">Share your business details and target audience information</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Intelligence</h3>
              <p className="text-gray-600 text-sm">AI analyzes cultural preferences and behavioral patterns</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategy Generation</h3>
              <p className="text-gray-600 text-sm">Receive comprehensive marketing strategy with actionable insights</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { App as default };