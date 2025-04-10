'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-100' },
  { emoji: '😔', label: 'Sad', color: 'bg-gray-100' },
  { emoji: '🤔', label: 'Anxious', color: 'bg-orange-100' },
  { emoji: '😴', label: 'Tired', color: 'bg-purple-100' },
  { emoji: '😤', label: 'Frustrated', color: 'bg-red-100' },
  { emoji: '🙏', label: 'Grateful', color: 'bg-green-100' },
  { emoji: '💪', label: 'Strong', color: 'bg-indigo-100' }
];

const communityInsights = [
  {
    mood: 'Grateful',
    percentage: 65,
    message: 'Most of us felt grateful this week 💛'
  },
  {
    mood: 'Anxious',
    percentage: 45,
    message: 'Many of us are dealing with scanxiety this week'
  },
  {
    mood: 'Strong',
    percentage: 55,
    message: 'Over half of us are feeling strong and resilient'
  }
];

export default function CheckInPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState({
    canCheckIn: false,
    message: '',
    nextCheckInTime: null as Date | null
  });
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [publicMoodStats, setPublicMoodStats] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkCheckInAvailability();
    loadJournalEntries();
    loadPublicMoodStats();
  }, []);

  const loadJournalEntries = () => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
  };

  const loadPublicMoodStats = () => {
    // Get check-in history
    const checkInHistory = JSON.parse(localStorage.getItem('checkInHistory') || '[]');
    
    // Filter for public check-ins from today
    const today = new Date().toISOString().split('T')[0];
    const todayPublicCheckIns = checkInHistory.filter((checkIn: any) => {
      const checkInDate = new Date(checkIn.timestamp).toISOString().split('T')[0];
      return checkInDate === today && !checkIn.isPrivate;
    });
    
    // Count occurrences of each mood
    const moodCounts: Record<string, number> = {};
    todayPublicCheckIns.forEach((checkIn: any) => {
      if (checkIn.mood) {
        moodCounts[checkIn.mood] = (moodCounts[checkIn.mood] || 0) + 1;
      }
    });
    
    // Calculate percentages
    const totalCheckIns = todayPublicCheckIns.length;
    const stats = Object.entries(moodCounts).map(([mood, count]) => {
      const percentage = totalCheckIns > 0 ? Math.round((count / totalCheckIns) * 100) : 0;
      return {
        mood,
        count,
        percentage,
        emoji: moods.find(m => m.label === mood)?.emoji || '😊'
      };
    });
    
    // Sort by percentage (highest first)
    stats.sort((a, b) => b.percentage - a.percentage);
    
    setPublicMoodStats(stats);
  };

  const checkCheckInAvailability = () => {
    const now = new Date();
    const hour = now.getHours();
    const today = now.toISOString().split('T')[0];
    
    // Get check-in history
    const checkInHistory = JSON.parse(localStorage.getItem('checkInHistory') || '[]');
    
    // Check if user has already checked in today
    const todayCheckIns = checkInHistory.filter((checkIn: any) => {
      const checkInDate = new Date(checkIn.timestamp).toISOString().split('T')[0];
      return checkInDate === today;
    });
    
    // Determine if it's morning (5am-11am) or evening (5pm-11pm)
    const isMorning = hour >= 5 && hour < 11;
    const isEvening = hour >= 17 && hour < 23;
    
    // Check if user has already checked in for the current period
    const hasCheckedInMorning = todayCheckIns.some((checkIn: any) => {
      const checkInHour = new Date(checkIn.timestamp).getHours();
      return checkInHour >= 5 && checkInHour < 11;
    });
    
    const hasCheckedInEvening = todayCheckIns.some((checkIn: any) => {
      const checkInHour = new Date(checkIn.timestamp).getHours();
      return checkInHour >= 17 && checkInHour < 23;
    });
    
    // Determine if user can check in and set appropriate message
    if (isMorning && !hasCheckedInMorning) {
      setCheckInStatus({
        canCheckIn: true,
        message: 'Good morning! How are you feeling today?',
        nextCheckInTime: null
      });
    } else if (isEvening && !hasCheckedInEvening) {
      setCheckInStatus({
        canCheckIn: true,
        message: 'Good evening! How was your day?',
        nextCheckInTime: null
      });
    } else if (isMorning && hasCheckedInMorning) {
      const nextTime = new Date();
      nextTime.setHours(17, 0, 0, 0);
      setCheckInStatus({
        canCheckIn: false,
        message: 'You\'ve already checked in this morning. Come back this evening!',
        nextCheckInTime: nextTime
      });
    } else if (isEvening && hasCheckedInEvening) {
      const nextTime = new Date();
      nextTime.setDate(nextTime.getDate() + 1);
      nextTime.setHours(5, 0, 0, 0);
      setCheckInStatus({
        canCheckIn: false,
        message: 'You\'ve already checked in this evening. Come back tomorrow morning!',
        nextCheckInTime: nextTime
      });
    } else {
      // Outside of check-in hours
      let nextTime: Date;
      if (hour < 5) {
        // Before morning check-in
        nextTime = new Date();
        nextTime.setHours(5, 0, 0, 0);
      } else if (hour < 17) {
        // Between morning and evening check-in
        nextTime = new Date();
        nextTime.setHours(17, 0, 0, 0);
      } else {
        // After evening check-in
        nextTime = new Date();
        nextTime.setDate(nextTime.getDate() + 1);
        nextTime.setHours(5, 0, 0, 0);
      }
      
      setCheckInStatus({
        canCheckIn: false,
        message: 'Check-ins are available from 5am-11am and 5pm-11pm.',
        nextCheckInTime: nextTime
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save check-in data
    const checkInData = {
      mood: selectedMood,
      note,
      isPrivate,
      timestamp: new Date().toISOString(),
      period: new Date().getHours() >= 5 && new Date().getHours() < 11 ? 'morning' : 'evening'
    };
    
    // Save to localStorage
    localStorage.setItem('lastCheckIn', checkInData.timestamp);
    
    // Save check-in history
    const checkInHistory = JSON.parse(localStorage.getItem('checkInHistory') || '[]');
    checkInHistory.push(checkInData);
    localStorage.setItem('checkInHistory', JSON.stringify(checkInHistory));
    
    // Save journal entry if note is provided
    if (note.trim()) {
      const journalEntry = {
        content: note,
        mood: selectedMood,
        timestamp: new Date().toISOString(),
        isPrivate
      };
      
      const updatedEntries = [...journalEntries, journalEntry];
      setJournalEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    }
    
    // Update public mood stats if this check-in is public
    if (!isPrivate && selectedMood) {
      loadPublicMoodStats();
    }
    
    setIsSubmitted(true);
    
    // Redirect back to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const formatNextCheckInTime = () => {
    if (!checkInStatus.nextCheckInTime) return '';
    
    const nextTime = new Date(checkInStatus.nextCheckInTime);
    return nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Daily Check-in</h1>
          <p className="text-gray-600 mt-2">{checkInStatus.message}</p>
          {!checkInStatus.canCheckIn && checkInStatus.nextCheckInTime && (
            <p className="text-blue-600 mt-2">
              Next check-in available at: {formatNextCheckInTime()}
            </p>
          )}
        </div>

        {!isSubmitted && checkInStatus.canCheckIn ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">How are you feeling today?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => setSelectedMood(mood.label)}
                    className={`p-4 rounded-lg text-center transition-all duration-300 ${
                      selectedMood === mood.label
                        ? `${mood.color} ring-2 ring-blue-500 scale-110 z-10`
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-4xl block mb-2 transform transition-transform duration-300 hover:scale-150 hover:translate-y-[-10px]">{mood.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Journal Entry
              </label>
              <textarea
                id="note"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="How are you feeling? What's on your mind? Write your thoughts here..."
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
                  Keep this check-in private
                </label>
              </div>
              {!isPrivate && (
                <p className="mt-2 text-sm text-blue-600">
                  Your mood will be included in the community's daily average.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedMood}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Check-in
            </button>
          </form>
        ) : isSubmitted ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <span className="text-4xl mb-4 block">
              {moods.find(m => m.label === selectedMood)?.emoji}
            </span>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Check-in Submitted
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for sharing how you're feeling today.
            </p>
            <p className="text-blue-600 font-medium">
              Redirecting you back to the dashboard...
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thank You For The Update
            </h2>
            <p className="text-gray-600 mb-4">
              {checkInStatus.message}
            </p>
            <p className="text-blue-600 font-medium mb-4">
              Check back in tomorrow morning!
            </p>
            {checkInStatus.nextCheckInTime && (
              <p className="text-blue-600">
                Next check-in available at: {formatNextCheckInTime()}
              </p>
            )}
          </div>
        )}

        {/* Public Mood Stats Section */}
        {!isPrivate && publicMoodStats.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">Today's Community Mood</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Live</span>
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                Based on {publicMoodStats.reduce((sum, stat) => sum + stat.count, 0)} public check-ins today
              </p>
              <div className="space-y-4">
                {publicMoodStats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-2xl mr-3">{stat.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{stat.mood}</span>
                        <span className="text-sm font-medium text-blue-600">{stat.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Make your check-in public to contribute to the community's mood average.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">Your Journal</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Personal</span>
          </h2>
          
          {journalEntries.length > 0 ? (
            <div className="space-y-4">
              {journalEntries.map((entry, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {moods.find(m => m.label === entry.mood)?.emoji || '📝'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    {entry.isPrivate && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">
                Your journal entries will appear here. Start by adding a note to your check-in!
              </p>
            </div>
          )}
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">
              Your journal entries are private and only visible to you. They help you track your thoughts and feelings over time.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 