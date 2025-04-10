'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
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
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              HALO
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find support for your oligodendroglioma journey
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/onboarding/focus"
                className="inline-block w-full md:w-auto bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-400 transition-colors text-lg font-medium shadow-sm"
              >
                Get Started
              </Link>
              
              <p className="text-sm text-blue-400">
                Your privacy is important to us. You can browse anonymously.
              </p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 rounded-lg pulse-blue"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-4">🏥</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Find Support</h2>
                <p className="text-gray-600 mb-4">Discover organizations and support programs near you.</p>
                <Link href="/onboarding/focus?focus=organizations" className="text-blue-500 hover:text-blue-600 font-medium">
                  Explore →
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 rounded-lg pulse-blue"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-4">🤝</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect</h2>
                <p className="text-gray-600 mb-4">Connect with others who understand your journey.</p>
                <Link href="/onboarding/focus?focus=connect" className="text-blue-500 hover:text-blue-600 font-medium">
                  Connect →
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 rounded-lg pulse-blue"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-4">📚</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Learn</h2>
                <p className="text-gray-600 mb-4">Access helpful information and stay updated.</p>
                <Link href="/onboarding/focus?focus=info" className="text-blue-500 hover:text-blue-600 font-medium">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 