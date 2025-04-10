'use client';

import React, { useState } from 'react';

const categories = [
  {
    id: 'diagnosis',
    title: 'Understanding Your Diagnosis',
    icon: '🔍',
    articles: [
      {
        id: 1,
        title: 'What is Oligodendroglioma?',
        description: 'A comprehensive guide to understanding your diagnosis',
        readTime: '5 min read',
        source: 'National Brain Tumor Society'
      },
      {
        id: 2,
        title: 'Understanding Tumor Grades',
        description: 'Learn about Grade II and Grade III oligodendrogliomas',
        readTime: '4 min read',
        source: 'American Brain Tumor Association'
      }
    ]
  },
  {
    id: 'first-90-days',
    title: 'Your First 90 Days',
    icon: '📅',
    articles: [
      {
        id: 3,
        title: 'Creating Your Care Team',
        description: 'How to build the right medical team for your journey',
        readTime: '6 min read',
        source: 'HALO Guide'
      },
      {
        id: 4,
        title: 'Understanding Treatment Options',
        description: 'Overview of surgery, radiation, and chemotherapy',
        readTime: '7 min read',
        source: 'National Cancer Institute'
      }
    ]
  },
  {
    id: 'coping',
    title: 'Coping Tools',
    icon: '🧘',
    articles: [
      {
        id: 5,
        title: 'Managing Scanxiety',
        description: 'Practical strategies for dealing with scan anxiety',
        readTime: '4 min read',
        source: 'HALO Guide'
      },
      {
        id: 6,
        title: 'Mindfulness for Brain Tumor Patients',
        description: 'Simple mindfulness exercises for daily practice',
        readTime: '5 min read',
        source: 'Cancer Support Community'
      }
    ]
  },
  {
    id: 'relationships',
    title: 'Relationships & Communication',
    icon: '💝',
    articles: [
      {
        id: 7,
        title: 'Talking to Your Employer',
        description: 'Guide to workplace communication and accommodations',
        readTime: '6 min read',
        source: 'HALO Guide'
      },
      {
        id: 8,
        title: 'Supporting Your Family',
        description: 'How to help your loved ones understand and cope',
        readTime: '5 min read',
        source: 'Family Caregiver Alliance'
      }
    ]
  }
];

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter(category => {
    if (selectedCategory && category.id !== selectedCategory) return false;
    
    if (searchQuery) {
      const hasMatchingArticles = category.articles.some(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return hasMatchingArticles;
    }
    
    return true;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
        <p className="text-gray-600 mt-2">Helpful information and guides for your journey</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
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
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {category.articles.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {article.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.source}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Looking for something specific?
        </h2>
        <p className="text-gray-600 mb-4">
          Our knowledge base is constantly growing. If you can't find what you're looking for:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li>• Check our frequently updated resources</li>
          <li>• Ask our community for recommendations</li>
          <li>• Request new content through our feedback form</li>
        </ul>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Request Content
        </button>
      </div>
    </main>
  );
} 