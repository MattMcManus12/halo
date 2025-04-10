'use client';

import React, { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Brain Tumor Awareness Walk',
    description: 'Annual walk to raise awareness and funds for brain tumor research',
    date: '2024-05-15',
    time: '09:00',
    location: {
      city: 'Boston',
      state: 'MA',
      address: 'Boston Common, Boston, MA 02108',
      coordinates: { lat: 42.3554, lng: -71.0655 }
    },
    type: 'in-person',
    category: 'awareness',
    organization: 'National Brain Tumor Society',
    registrationUrl: 'https://example.com/walk'
  },
  {
    id: 2,
    title: 'Understanding Your MRI Results',
    description: 'Virtual webinar with leading neuro-oncologists',
    date: '2024-04-20',
    time: '14:00',
    location: {
      city: 'Virtual',
      state: 'Online',
      address: 'Zoom Webinar',
      coordinates: null
    },
    type: 'virtual',
    category: 'education',
    organization: 'HALO',
    registrationUrl: 'https://example.com/webinar'
  },
  {
    id: 3,
    title: 'Caregiver Support Workshop',
    description: 'Monthly workshop for caregivers of brain tumor patients',
    date: '2024-04-25',
    time: '18:30',
    location: {
      city: 'Chicago',
      state: 'IL',
      address: '123 Support Center, Chicago, IL 60601',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    type: 'hybrid',
    category: 'support',
    organization: 'Cancer Support Community',
    registrationUrl: 'https://example.com/workshop'
  }
];

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'awareness', label: 'Awareness Events' },
  { id: 'education', label: 'Educational' },
  { id: 'support', label: 'Support Groups' },
  { id: 'research', label: 'Research Updates' }
];

const eventTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'in-person', label: 'In-Person' },
  { id: 'virtual', label: 'Virtual' },
  { id: 'hybrid', label: 'Hybrid' }
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600 mt-2">Discover local and virtual events in your area</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                  {event.type === 'virtual' && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      Virtual
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Time:</span>{' '}
                    {new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {event.location.address}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Organization:</span> {event.organization}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Register Now
                </a>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Want to host an event?
        </h2>
        <p className="text-gray-600 mb-4">
          We welcome community-led events that support our mission. If you'd like to host an event:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li>• Submit your event for review</li>
          <li>• Get help promoting your event</li>
          <li>• Connect with other event organizers</li>
        </ul>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Submit Event
        </button>
      </div>
    </main>
  );
} 