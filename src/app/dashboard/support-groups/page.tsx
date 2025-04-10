'use client';

import React, { useState } from 'react';

interface SupportGroup {
  id: number;
  name: string;
  description: string;
  type: string;
  location: string;
  schedule: string;
  contact: string;
  isVirtual: boolean;
}

const supportGroups: SupportGroup[] = [
  // Massachusetts
  {
    id: 1,
    name: 'Massachusetts General Hospital Cancer Center Workshops and Support Groups',
    description: 'Offers a variety of support programs designed to help patients, families, and caregivers cope with cancer diagnoses.',
    type: 'Hospital',
    location: 'Boston, MA',
    schedule: 'Various times - check online calendar',
    contact: 'View online calendar for program listings',
    isVirtual: false
  },
  {
    id: 2,
    name: 'Dana-Farber Cancer Institute Brain Tumor Support Group',
    description: 'Provides support for brain tumor patients and their caregivers.',
    type: 'Hospital',
    location: 'Boston, MA',
    schedule: 'Monthly',
    contact: '617-632-3301',
    isVirtual: false
  },
  // Connecticut
  {
    id: 3,
    name: 'Yale New Haven Health Brain Tumor Support Group',
    description: 'Serves patients and family members, meeting monthly.',
    type: 'Hospital',
    location: 'New Haven, CT',
    schedule: 'Monthly',
    contact: '203-688-7528',
    isVirtual: false
  },
  {
    id: 4,
    name: 'Connecticut Brain Tumor Alliance (CTBTA) Support Groups',
    description: 'Offers the Gray Ribbon Club and Good Grief Group for patients and caregivers.',
    type: 'Nonprofit',
    location: 'Hartford, CT',
    schedule: 'Monthly',
    contact: 'Contact through website',
    isVirtual: false
  },
  // Rhode Island
  {
    id: 5,
    name: 'Rhode Island Brain & Spine Tumor Foundation (RIBSTF) Support Group',
    description: 'Hosts monthly support group meetings for patients, families, and caregivers.',
    type: 'Nonprofit',
    location: 'Providence, RI',
    schedule: 'Monthly',
    contact: '(401)-272-4177',
    isVirtual: false
  },
  {
    id: 6,
    name: 'Lifespan Cancer Institute Glioblastoma Caregiver Support Group',
    description: 'Open to caregivers of patients diagnosed with glioblastoma, meeting monthly.',
    type: 'Hospital',
    location: 'Providence, RI',
    schedule: 'Monthly',
    contact: '401-444-0073',
    isVirtual: false
  },
  // Vermont
  {
    id: 7,
    name: 'Central Vermont Medical Center Living with Advanced Cancer Support Group',
    description: 'Offers support for individuals living with advanced cancer.',
    type: 'Hospital',
    location: 'Berlin, VT',
    schedule: 'Weekly - Wednesdays 3-4pm',
    contact: 'Contact through website',
    isVirtual: true
  },
  // New Hampshire
  {
    id: 8,
    name: 'Brain Injury Association of New Hampshire Support Groups',
    description: 'Provides support for individuals with brain injuries, including brain tumors.',
    type: 'Nonprofit',
    location: 'Statewide, NH',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  // Maine
  {
    id: 9,
    name: 'MaineHealth Cancer Support Groups',
    description: 'Offers various support groups for cancer patients and their families.',
    type: 'Hospital',
    location: 'Statewide, ME',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  // New York
  {
    id: 10,
    name: 'Weill Cornell Medicine Brain Tumor Support Group',
    description: 'Monthly drop-in support group for individuals with primary brain tumors and their caregivers.',
    type: 'Hospital',
    location: 'New York City, NY',
    schedule: 'Monthly',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 11,
    name: 'Memorial Sloan Kettering Cancer Center Brain Tumor Support Group',
    description: 'Offers support for patients with primary brain tumors.',
    type: 'Hospital',
    location: 'New York City, NY',
    schedule: 'Monthly',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 12,
    name: 'New York Oncology Hematology Brain Tumor Support Group',
    description: 'Provides a setting for individuals and loved ones impacted by brain tumors to come together.',
    type: 'Hospital',
    location: 'Albany, NY',
    schedule: 'Monthly',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 13,
    name: 'Roswell Park Comprehensive Cancer Center Support Groups',
    description: 'Offers various support groups for cancer patients, including those with brain tumors.',
    type: 'Hospital',
    location: 'Buffalo, NY',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 14,
    name: 'Wilmot Cancer Institute Support Groups',
    description: 'Provides opportunities to connect with others facing cancer.',
    type: 'Hospital',
    location: 'Rochester, NY',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 15,
    name: 'Gilda\'s Club Rochester',
    description: 'Offers support groups and resources for individuals impacted by cancer.',
    type: 'Nonprofit',
    location: 'Rochester, NY',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 16,
    name: 'SUNY Upstate Cancer Center Support Groups',
    description: 'Provides support for patients and caregivers dealing with cancer.',
    type: 'Hospital',
    location: 'Syracuse, NY',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  // New Jersey
  {
    id: 17,
    name: 'New Jersey Brain Tumor Support Groups (CNJBTSG North & South)',
    description: 'Offers support groups for brain tumor patients and caregivers.',
    type: 'Nonprofit',
    location: 'Statewide, NJ',
    schedule: 'Monthly',
    contact: 'Contact for information',
    isVirtual: false
  },
  {
    id: 18,
    name: 'Rutgers Cancer Institute of New Jersey Support and Education Groups',
    description: 'Provides support and education for patients and the community.',
    type: 'Hospital',
    location: 'New Brunswick, NJ',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  // Pennsylvania
  {
    id: 19,
    name: 'Penn Medicine Brain Tumor Support Group',
    description: 'Offers support for patients and their families dealing with brain tumors.',
    type: 'Hospital',
    location: 'Philadelphia, PA',
    schedule: 'Monthly',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 20,
    name: 'Jefferson Brain Tumor Center',
    description: 'Provides comprehensive care and support for brain tumor patients.',
    type: 'Hospital',
    location: 'Philadelphia, PA',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 21,
    name: 'UPMC Hillman Cancer Center Support Groups',
    description: 'Offers various support groups for cancer patients and their families.',
    type: 'Hospital',
    location: 'Pittsburgh, PA',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  },
  {
    id: 22,
    name: 'Cancer Bridges Support Groups',
    description: 'Provides support groups focusing on emotional support and educational topics.',
    type: 'Nonprofit',
    location: 'Pittsburgh, PA',
    schedule: 'Various times',
    contact: 'Contact through website',
    isVirtual: false
  }
];

export default function SupportGroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredGroups = supportGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || group.type === selectedType;
    const matchesLocation = selectedLocation === 'All' || group.location.includes(selectedLocation);

    return matchesSearch && matchesType && matchesLocation;
  });

  const uniqueTypes = ['All', ...Array.from(new Set(supportGroups.map(group => group.type)))];
  const uniqueLocations = ['All', ...Array.from(new Set(supportGroups.map(group => {
    // Extract state from location (e.g., "Boston, MA" -> "MA")
    const stateMatch = group.location.match(/, ([A-Z]{2})$/);
    return stateMatch ? stateMatch[1] : group.location;
  })))];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Groups</h1>
        <p className="text-gray-600 mt-2">Find local and virtual support groups in your area</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search support groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {uniqueLocations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedLocation === location
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{group.name}</h2>
                <p className="text-gray-600 mt-2">{group.description}</p>
              </div>
              {group.isVirtual && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Virtual
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Type:</span> {group.type}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Location:</span> {group.location}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Schedule:</span> {group.schedule}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Contact:</span> {group.contact}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                RSVP
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Can't find a local support group?
        </h2>
        <p className="text-gray-600 mb-4">
          We understand that finding the right support group can be challenging. Here are some options:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li>• Connect with virtual support groups</li>
          <li>• Start your own support group with our guidance</li>
          <li>• Join our online community for peer support</li>
        </ul>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Learn More
        </button>
      </div>
    </main>
  );
} 