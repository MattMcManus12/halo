'use client';

import React, { useState } from 'react';

interface Organization {
  id: number;
  name: string;
  description: string;
  type: string;
  location: string;
  isVerified: boolean;
  website: string;
  programs: string[];
  contact: string;
}

const organizations: Organization[] = [
  // Massachusetts Organizations
  {
    id: 1,
    name: 'Massachusetts General Hospital Cancer Center',
    description: 'Offers a variety of support programs designed to help patients, families, and caregivers cope with cancer diagnoses.',
    type: 'Hospital',
    location: 'Boston, MA',
    isVerified: true,
    website: 'https://www.massgeneral.org/cancer-center',
    programs: ['Support Groups', 'Workshops'],
    contact: 'View online calendar for program listings'
  },
  {
    id: 2,
    name: 'Dana-Farber Cancer Institute',
    description: 'Provides support for brain tumor patients and their caregivers through dedicated support groups.',
    type: 'Hospital',
    location: 'Boston, MA',
    isVerified: true,
    website: 'https://www.dana-farber.org',
    programs: ['Brain Tumor Support Group'],
    contact: '617-632-3301'
  },
  {
    id: 3,
    name: 'National Brain Tumor Society (NBTS)',
    description: 'The largest nonprofit organization in the U.S. dedicated to the brain tumor community, offering support groups, educational resources, and funding research initiatives.',
    type: 'Nonprofit',
    location: 'Newton, MA',
    isVerified: true,
    website: 'https://braintumor.org',
    programs: ['Online Support Groups', 'Brain Tumor Support Conversations', 'Caregiver Support Conversations', 'Grief Support Conversations'],
    contact: 'Contact through website'
  },
  // Connecticut Organizations
  {
    id: 4,
    name: 'Connecticut Brain Tumor Alliance (CTBTA)',
    description: 'Dedicated to providing hope and support for brain tumor patients and caregivers through various programs and events.',
    type: 'Nonprofit',
    location: 'Hartford, CT',
    isVerified: true,
    website: 'https://ctbta.org',
    programs: ['Gray Ribbon Club', 'Good Grief Group'],
    contact: 'Contact through website'
  },
  {
    id: 5,
    name: 'Yale New Haven Health',
    description: 'Provides monthly support group meetings for brain tumor patients and family members.',
    type: 'Hospital',
    location: 'New Haven, CT',
    isVerified: true,
    website: 'https://www.ynhh.org',
    programs: ['Brain Tumor Support Group'],
    contact: '203-688-7528'
  },
  // Rhode Island Organizations
  {
    id: 6,
    name: 'Rhode Island Brain & Spine Tumor Foundation (RIBSTF)',
    description: 'Hosts monthly support group meetings for patients, families, and caregivers.',
    type: 'Nonprofit',
    location: 'Providence, RI',
    isVerified: true,
    website: 'https://ribstf.org',
    programs: ['Monthly Support Groups'],
    contact: '(401)-272-4177'
  },
  {
    id: 7,
    name: 'Lifespan Cancer Institute',
    description: 'Offers support groups for glioblastoma caregivers.',
    type: 'Hospital',
    location: 'Providence, RI',
    isVerified: true,
    website: 'https://www.lifespan.org',
    programs: ['Glioblastoma Caregiver Support Group'],
    contact: '401-444-0073'
  },
  // Vermont Organizations
  {
    id: 8,
    name: 'University of Vermont Medical Center',
    description: 'Offers support for brain tumor patients and families.',
    type: 'Hospital',
    location: 'Burlington, VT',
    isVerified: true,
    website: 'https://www.uvmhealth.org',
    programs: ['Brain Tumor Support Group'],
    contact: '(802) 847-3234'
  },
  // New Hampshire Organizations
  {
    id: 9,
    name: 'Dartmouth Cancer Center',
    description: 'Provides various support groups for patients and families.',
    type: 'Hospital',
    location: 'Lebanon, NH',
    isVerified: true,
    website: 'https://cancer.dartmouth.edu',
    programs: ['Various Support Groups'],
    contact: 'Visit events page'
  },
  {
    id: 10,
    name: 'Wentworth-Douglass Hospital',
    description: 'Hosts a Brain Injury/Brain Tumor Support Group.',
    type: 'Hospital',
    location: 'Rochester, NH',
    isVerified: true,
    website: 'https://www.wdhospital.org',
    programs: ['Brain Injury/Brain Tumor Support Group'],
    contact: '(603) 332-9891'
  },
  // Maine Organizations
  {
    id: 11,
    name: 'Dempsey Center',
    description: 'Offers various support groups for individuals and families impacted by cancer.',
    type: 'Nonprofit',
    location: 'South Portland, ME',
    isVerified: true,
    website: 'https://www.dempseycenter.org',
    programs: ['Various Support Groups'],
    contact: '207-774-2200'
  },
  {
    id: 12,
    name: 'Maine Medical Center',
    description: 'Provides brain tumor support group meetings.',
    type: 'Hospital',
    location: 'Portland, ME',
    isVerified: true,
    website: 'https://www.mainehealth.org',
    programs: ['Brain Tumor Support'],
    contact: '207-662-1539'
  },
  // New York Organizations
  {
    id: 13,
    name: 'Weill Cornell Medicine',
    description: 'Monthly drop-in support group for individuals with primary brain tumors and their caregivers.',
    type: 'Hospital',
    location: 'New York City, NY',
    isVerified: true,
    website: 'https://weillcornell.org',
    programs: ['Brain Tumor Support Group'],
    contact: 'Contact through website'
  },
  {
    id: 14,
    name: 'Memorial Sloan Kettering Cancer Center',
    description: 'Offers various support groups and programs for people with cancer and their loved ones.',
    type: 'Hospital',
    location: 'New York City, NY',
    isVerified: true,
    website: 'https://www.mskcc.org',
    programs: ['Support Groups', 'Patient Programs'],
    contact: 'Contact through website'
  },
  // New Jersey Organizations
  {
    id: 15,
    name: 'New Jersey Brain Tumor Support Groups',
    description: 'Offers support groups in Central New Jersey for brain tumor patients and caregivers.',
    type: 'Nonprofit',
    location: 'Statewide, NJ',
    isVerified: true,
    website: 'Contact for information',
    programs: ['North & South Support Groups'],
    contact: 'Contact for information'
  },
  {
    id: 16,
    name: 'Atlantic Health System\'s Gerald J. Glasser Brain Tumor Center',
    description: 'Provides resources and support for patients and families dealing with brain tumors.',
    type: 'Hospital',
    location: 'Morristown, NJ',
    isVerified: true,
    website: 'https://www.atlantichealth.org',
    programs: ['Patient Resources', 'Family Support'],
    contact: 'Contact through website'
  },
  // Pennsylvania Organizations
  {
    id: 17,
    name: 'Penn Medicine Abramson Cancer Center',
    description: 'Offers support for brain tumor patients and their families.',
    type: 'Hospital',
    location: 'Philadelphia, PA',
    isVerified: true,
    website: 'https://www.pennmedicine.org',
    programs: ['Brain Tumor Support Group'],
    contact: 'Contact through website'
  },
  // National Organizations
  {
    id: 18,
    name: 'American Brain Tumor Association (ABTA)',
    description: 'Provides comprehensive resources for patients and caregivers, including educational materials, webinars, and a mentorship program.',
    type: 'Nonprofit',
    location: 'National',
    isVerified: true,
    website: 'https://www.abta.org',
    programs: ['Educational Materials', 'Webinars', 'Mentorship Program'],
    contact: 'Contact through website'
  },
  {
    id: 19,
    name: 'Musella Foundation for Brain Tumor Research & Information',
    description: 'Provides support, information, and resources for brain tumor patients and their families.',
    type: 'Nonprofit',
    location: 'National',
    isVerified: true,
    website: 'https://virtualtrials.org',
    programs: ['Online Support Groups', 'Information Resources'],
    contact: 'Contact through website'
  },
  {
    id: 20,
    name: 'Brain Tumor Network',
    description: 'Offers free, personalized navigation services to patients with primary brain tumors.',
    type: 'Nonprofit',
    location: 'National',
    isVerified: true,
    website: 'https://braintumornetwork.org',
    programs: ['Treatment Navigation', 'Clinical Trial Search', 'Psychosocial Support'],
    contact: 'Contact through website'
  }
];

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || org.type === selectedType;

    return matchesSearch && matchesType;
  });

  const uniqueTypes = ['All', ...Array.from(new Set(organizations.map(org => org.type)))];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
        <p className="text-gray-600 mt-2">Find organizations and support groups in your area</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrganizations.map((org) => (
          <div
            key={org.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{org.name}</h2>
                <p className="text-gray-600 mt-2">{org.description}</p>
              </div>
              {org.isVerified && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Verified
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Type:</span> {org.type}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Location:</span> {org.location}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Programs:</span> {org.programs.join(', ')}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Contact:</span> {org.contact}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 