'use client';

import React, { useState } from 'react';

interface Connection {
  id: number;
  name: string;
  role: string;
  location: string;
  interests: string[];
  bio: string;
  isRequested: boolean;
  isConnected: boolean;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: Date;
}

const connections: Connection[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient',
    location: 'Boston, MA',
    interests: ['Oligodendroglioma', 'Clinical Trials', 'Alternative Therapies'],
    bio: 'Diagnosed with oligodendroglioma in 2022. Currently participating in a clinical trial and interested in connecting with others on similar treatment paths.',
    isRequested: false,
    isConnected: false
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Caregiver',
    location: 'New York, NY',
    interests: ['Caregiving', 'Mental Health', 'Family Support'],
    bio: 'Caregiver for my wife who was diagnosed with oligodendroglioma. Looking to connect with other caregivers to share experiences and support.',
    isRequested: false,
    isConnected: false
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    role: 'Healthcare Provider',
    location: 'Chicago, IL',
    interests: ['Neuro-oncology', 'Patient Care', 'Research'],
    bio: 'Neuro-oncologist specializing in brain tumors. Available to connect with patients and caregivers for informational support.',
    isRequested: false,
    isConnected: false
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Patient',
    location: 'Los Angeles, CA',
    interests: ['Oligodendroglioma', 'Quality of Life', 'Exercise'],
    bio: 'Living with oligodendroglioma for 5 years. Focused on maintaining quality of life through exercise and healthy living.',
    isRequested: false,
    isConnected: false
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Caregiver',
    location: 'Seattle, WA',
    interests: ['Caregiving', 'Nutrition', 'Wellness'],
    bio: 'Caregiver for my brother with oligodendroglioma. Passionate about nutrition and wellness approaches to support treatment.',
    isRequested: false,
    isConnected: false
  },
  {
    id: 6,
    name: 'James Anderson',
    role: 'Patient',
    location: 'Miami, FL',
    interests: ['Oligodendroglioma', 'Support Groups', 'Advocacy'],
    bio: 'Diagnosed in 2021. Active in support groups and advocacy efforts for brain tumor awareness.',
    isRequested: false,
    isConnected: false
  }
];

// Sample messages for demonstration
const initialMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    receiverId: 0, // 0 represents the current user
    text: "Hi there! I saw we both have oligodendroglioma. How are you doing?",
    timestamp: new Date(2023, 5, 15, 14, 30)
  },
  {
    id: 2,
    senderId: 0,
    receiverId: 1,
    text: "Hello! I'm doing well, thanks for asking. How about you?",
    timestamp: new Date(2023, 5, 15, 14, 35)
  },
  {
    id: 3,
    senderId: 1,
    receiverId: 0,
    text: "I'm hanging in there. Just finished my latest round of treatment. How long have you been diagnosed?",
    timestamp: new Date(2023, 5, 15, 14, 40)
  }
];

export default function ConnectPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [connectionsList, setConnectionsList] = useState<Connection[]>(connections);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    role: 'Patient',
    location: '',
    interests: '',
    bio: ''
  });
  const [activeTab, setActiveTab] = useState<'discover' | 'connections'>('discover');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  const filteredConnections = connectionsList.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || connection.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const connectedUsers = connectionsList.filter(connection => connection.isConnected);

  const handleRequestConnection = (id: number) => {
    setConnectionsList(prevConnections => 
      prevConnections.map(connection => 
        connection.id === id 
          ? { ...connection, isRequested: true } 
          : connection
      )
    );
  };

  const handleAcceptConnection = (id: number) => {
    setConnectionsList(prevConnections => 
      prevConnections.map(connection => 
        connection.id === id 
          ? { ...connection, isRequested: false, isConnected: true } 
          : connection
      )
    );
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    console.log('Registration submitted:', registrationForm);
    setShowRegistrationForm(false);
    // Reset form
    setRegistrationForm({
      name: '',
      email: '',
      role: 'Patient',
      location: '',
      interests: '',
      bio: ''
    });
    // Show success message
    alert('Thank you for registering! We will review your information and get back to you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConnection) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: 0, // Current user
      receiverId: selectedConnection.id,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getMessagesForConnection = (connectionId: number) => {
    return messages.filter(
      msg => (msg.senderId === connectionId && msg.receiverId === 0) || 
             (msg.senderId === 0 && msg.receiverId === connectionId)
    );
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connect</h1>
        <p className="text-gray-600 mt-2">Find and connect with others in the oligodendroglioma community</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('discover')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'discover'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'connections'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Connections
          </button>
        </nav>
      </div>

      {activeTab === 'discover' && (
        <>
          {/* Registration Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Be a Helping Hand</h2>
                <p className="text-gray-600 mt-1">Register to connect with others in the community</p>
              </div>
              <button 
                onClick={() => setShowRegistrationForm(!showRegistrationForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showRegistrationForm ? 'Cancel' : 'Register Now'}
              </button>
            </div>

            {showRegistrationForm && (
              <form onSubmit={handleRegistrationSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={registrationForm.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={registrationForm.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      id="role"
                      name="role"
                      value={registrationForm.role}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                    >
                      <option value="Patient">Patient</option>
                      <option value="Caregiver">Caregiver</option>
                      <option value="Healthcare Provider">Healthcare Provider</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={registrationForm.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests</label>
                  <input
                    type="text"
                    id="interests"
                    name="interests"
                    value={registrationForm.interests}
                    onChange={handleInputChange}
                    placeholder="Separate interests with commas"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={registrationForm.bio}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us how people can relate to you..."
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'Patient', 'Caregiver', 'Healthcare Provider', 'Researcher'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedRole === role
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredConnections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{connection.name}</h2>
                    <p className="text-blue-600 font-medium">{connection.role}</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {connection.location}
                  </span>
                </div>
                <p className="text-gray-600 mt-4">{connection.bio}</p>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Interests:</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {connection.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  {connection.isRequested ? (
                    <button
                      disabled
                      className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                    >
                      Request Sent
                    </button>
                  ) : connection.isConnected ? (
                    <button
                      onClick={() => {
                        setActiveTab('connections');
                        setSelectedConnection(connection);
                      }}
                      className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      Chat Now
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRequestConnection(connection.id)}
                      className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Request Connection
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'connections' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Connections List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Connections</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {connectedUsers.length > 0 ? (
                connectedUsers.map((connection) => (
                  <div
                    key={connection.id}
                    onClick={() => setSelectedConnection(connection)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedConnection?.id === connection.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{connection.name}</h3>
                        <p className="text-xs text-gray-500">{connection.role}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {getMessagesForConnection(connection.id).length > 0 && (
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full">
                            {getMessagesForConnection(connection.id).length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p>You don't have any connections yet.</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Find connections
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
            {selectedConnection ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">{selectedConnection.name}</h2>
                  <p className="text-sm text-gray-500">{selectedConnection.role}</p>
                </div>
                <div className="p-4 h-[400px] overflow-y-auto">
                  {getMessagesForConnection(selectedConnection.id).map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.senderId === 0 ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.senderId === 0
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>Select a connection to start chatting</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How Connections Work
        </h2>
        <p className="text-gray-600 mb-4">
          Our connection feature is designed to protect your privacy while helping you find meaningful connections:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li>• When you request a connection, we notify the other person</li>
          <li>• If they accept, you'll be able to exchange messages through our platform</li>
          <li>• Your personal contact information is never shared without your permission</li>
          <li>• You can disconnect at any time</li>
        </ul>
      </div>
    </main>
  );
} 