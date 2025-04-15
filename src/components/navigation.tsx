'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState({ city: '', state: '' });
  const [tempLocation, setTempLocation] = useState({ city: '', state: '' });

  useEffect(() => {
    // Get user location from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const { city, state } = JSON.parse(userProfile);
      setUserLocation({ city, state });
      setTempLocation({ city, state });
    }
  }, []);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      localStorage.setItem('userProfile', JSON.stringify({
        ...profile,
        city: tempLocation.city,
        state: tempLocation.state
      }));
    }
    setUserLocation(tempLocation);
    setIsEditingLocation(false);
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Organizations', href: '/dashboard/organizations', icon: '🏥' },
    { name: 'Support Groups', href: '/dashboard/support-groups', icon: '🤝' },
    { name: 'Connect', href: '/dashboard/connect', icon: '👥' },
    { name: 'Check-in', href: '/dashboard/check-in', icon: '📝' },
    { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: '📚' },
    { name: 'Events', href: '/dashboard/events', icon: '📅' },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('menu-panel');
      const button = document.getElementById('menu-button');
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Menu button */}
          <div className="flex items-center">
            <button
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* HALO logo - centered */}
          <div className="flex items-center justify-center">
            <Link 
              href={pathname.includes('/dashboard') || pathname.includes('/onboarding') ? '/dashboard' : '/'} 
              className="text-3xl font-bold text-blue-600"
            >
              HALO
            </Link>
          </div>
          
          {/* Empty div for flex spacing */}
          <div className="w-10"></div>
        </div>
      </div>

      {/* Menu panel - dropdown */}
      <div 
        id="menu-panel"
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } absolute z-50 w-64 bg-white shadow-lg rounded-md mt-1 left-0`}
        style={{ top: '64px' }}
      >
        <div className="py-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 text-sm ${
                isActive(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 