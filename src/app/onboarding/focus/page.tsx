'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const focusOptions = [
  {
    title: 'Find Support',
    description: 'Discover organizations and support programs near you',
    icon: '🏥',
    href: '/onboarding/profile?focus=organizations',
    param: 'organizations'
  },
  {
    title: 'Connect',
    description: 'Connect with others who understand your journey',
    icon: '🤝',
    href: '/onboarding/profile?focus=connect',
    param: 'connect'
  },
  {
    title: 'Learn',
    description: 'Access helpful information and stay updated',
    icon: '📚',
    href: '/onboarding/profile?focus=info',
    param: 'info'
  }
];

export default function FocusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FocusContent />
    </Suspense>
  );
}

function FocusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const focus = searchParams.get('focus');
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If a focus parameter is provided in the URL, redirect to the profile page with that focus
    if (focus) {
      const matchingOption = focusOptions.find(option => option.param === focus);
      if (matchingOption) {
        router.push(matchingOption.href);
      }
    }
  }, [focus, router]);

  const handleContinue = () => {
    if (!selectedFocus) {
      setError('Please select what you would like to focus on');
      return;
    }
    const option = focusOptions.find(opt => opt.param === selectedFocus);
    if (option) {
      router.push(option.href);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <style jsx>{`
        @keyframes pulse-blue {
          0% {
            background-color: rgba(219, 234, 254, 0.2);
          }
          50% {
            background-color: rgba(191, 219, 254, 0.4);
          }
          100% {
            background-color: rgba(219, 234, 254, 0.2);
          }
        }
        .pulse-blue {
          animation: pulse-blue 3s infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What would you like to focus on?
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Choose what matters most to you right now
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusOptions.map((option) => (
              <button
                key={option.title}
                onClick={() => {
                  setSelectedFocus(option.param);
                  setError(null);
                }}
                className={`block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${
                  selectedFocus === option.param ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="absolute inset-0 rounded-lg pulse-blue"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{option.icon}</div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h2>
                  <p className="text-gray-600">
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          
          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 