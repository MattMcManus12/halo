'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const focus = searchParams.get('focus');

  const [formData, setFormData] = useState({
    diagnosis: '',
    diagnosisYear: '',
    ageGroup: '',
    city: '',
    state: '',
    phoneNumber: '',
    isAnonymous: false,
    emailUpdates: false,
    regionalAlerts: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.diagnosis || !formData.diagnosisYear || !formData.ageGroup) {
      alert('Please fill in all required fields (Diagnosis, Year of Diagnosis, and Age Group)');
      return;
    }
    
    // Store user information in localStorage for now
    localStorage.setItem('userProfile', JSON.stringify(formData));
    
    // Redirect to the appropriate dashboard page based on focus
    if (focus) {
      switch (focus) {
        case 'organizations':
          router.push('/dashboard/organizations');
          break;
        case 'info':
          router.push('/dashboard/knowledge');
          break;
        case 'connect':
          router.push('/dashboard/connect');
          break;
        default:
          router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600">Help us personalize your experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div>
                  <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                    Diagnosis *
                  </label>
                  <select
                    id="diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-blue-50"
                  >
                    <option value="">Select your diagnosis *</option>
                    <option value="oligodendroglioma_grade_2">Oligodendroglioma Grade II</option>
                    <option value="oligodendroglioma_grade_3">Oligodendroglioma Grade III</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="diagnosisYear" className="block text-sm font-medium text-gray-700">
                    Year of Diagnosis *
                  </label>
                  <input
                    type="number"
                    id="diagnosisYear"
                    name="diagnosisYear"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.diagnosisYear}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-blue-50"
                  />
                </div>

                <div>
                  <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
                    Age Group *
                  </label>
                  <select
                    id="ageGroup"
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-blue-50"
                  >
                    <option value="">Select your age group *</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-blue-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-blue-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-blue-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 