'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Organizations',
    description: 'Find trusted organizations and support programs',
    icon: '🏥',
    href: '/dashboard/organizations',
    color: 'blue'
  },
  {
    title: 'Support Groups',
    description: 'Connect with local and online support groups',
    icon: '👥',
    href: '/dashboard/support-groups',
    color: 'green'
  },
  {
    title: 'Connect',
    description: 'Connect with others who understand your journey',
    icon: '🤝',
    href: '/dashboard/connect',
    color: 'purple'
  },
  {
    title: 'Check-in',
    description: 'Track your symptoms and progress',
    icon: '📝',
    href: '/dashboard/check-in',
    color: 'emerald'
  },
  {
    title: 'Knowledge Base',
    description: 'Access helpful information and resources',
    icon: '📚',
    href: '/dashboard/knowledge',
    color: 'indigo'
  },
  {
    title: 'Events',
    description: 'Discover upcoming events and webinars',
    icon: '📅',
    href: '/dashboard/events',
    color: 'pink'
  }
];

// Illness-specific updates
const illnessUpdates = {
  oligodendroglioma: [
    {
      id: 1,
      title: "New Research on Oligodendroglioma Treatment",
      date: "2023-06-15",
      source: "Journal of Neuro-Oncology",
      summary: "Recent studies suggest that combining immunotherapy with standard treatments may improve outcomes for oligodendroglioma patients.",
      link: "#",
      fullContent: "Recent studies published in the Journal of Neuro-Oncology have shown promising results for oligodendroglioma patients. The research team, led by Dr. Sarah Johnson at Memorial Sloan Kettering Cancer Center, found that combining immunotherapy with standard treatments like radiation and chemotherapy may significantly improve outcomes.\n\nThe study followed 120 patients with newly diagnosed oligodendroglioma over a three-year period. Those who received the combined treatment approach showed a 40% improvement in progression-free survival compared to those who received standard treatment alone.\n\n'This is a significant finding that could change how we approach treatment for oligodendroglioma patients,' said Dr. Johnson. 'The immune system plays a crucial role in fighting cancer, and by enhancing its response, we may be able to improve long-term outcomes.'\n\nThe researchers also noted that the combined approach was well-tolerated by patients, with manageable side effects. Further studies are planned to confirm these findings and identify which patients might benefit most from this approach."
    },
    {
      id: 2,
      title: "Clinical Trial: Targeted Therapy for IDH-Mutant Tumors",
      date: "2023-05-22",
      source: "National Cancer Institute",
      summary: "A new phase III clinical trial is recruiting patients with IDH-mutant oligodendrogliomas to test a novel targeted therapy approach.",
      link: "#",
      fullContent: "The National Cancer Institute has announced a new phase III clinical trial specifically designed for patients with IDH-mutant oligodendrogliomas. This trial, called IDH-TARGET, will evaluate the effectiveness of a novel targeted therapy approach that directly attacks the genetic mutation found in these tumors.\n\nIDH mutations are present in approximately 80% of oligodendrogliomas and are considered a key driver of tumor growth. The new therapy, developed by Genentech, works by inhibiting the mutant IDH enzyme, which may slow or stop tumor growth.\n\nThe trial will enroll 300 patients across 50 medical centers in the United States and Canada. Participants will be randomly assigned to receive either the new targeted therapy plus standard treatment or standard treatment alone.\n\n'This trial represents a significant step forward in personalized medicine for brain tumor patients,' said Dr. Michael Chen, the lead investigator. 'By targeting the specific genetic mutation in these tumors, we hope to improve outcomes while potentially reducing side effects compared to traditional treatments.'\n\nPatients interested in participating can learn more at clinicaltrials.gov or by contacting the NCI Cancer Information Service."
    },
    {
      id: 3,
      title: "Updated Guidelines for Oligodendroglioma Care",
      date: "2023-04-10",
      source: "American Society of Clinical Oncology",
      summary: "The ASCO has released updated guidelines for the management of oligodendrogliomas, including new recommendations for follow-up care.",
      link: "#",
      fullContent: "The American Society of Clinical Oncology (ASCO) has released updated clinical practice guidelines for the management of oligodendrogliomas. These guidelines, published in the Journal of Clinical Oncology, reflect the latest research and expert consensus on best practices for treating and monitoring patients with this type of brain tumor.\n\nKey updates include:\n\n1. More frequent MRI monitoring in the first year after diagnosis (every 2-3 months)\n2. Integration of molecular testing (IDH mutation and 1p/19q codeletion status) into diagnostic criteria\n3. Updated recommendations for radiation therapy dosing and timing\n4. New guidance on managing treatment-related cognitive effects\n5. Expanded section on supportive care and quality of life considerations\n\nThe guidelines also emphasize the importance of a multidisciplinary approach to care, involving neurosurgeons, neuro-oncologists, radiation oncologists, and supportive care specialists.\n\n'These updated guidelines will help ensure that patients receive the most effective, evidence-based care throughout their journey with oligodendroglioma,' said Dr. Lisa DeAngelis, chair of the ASCO guideline panel. 'We've incorporated the latest research findings while also addressing the practical aspects of patient care that are crucial for optimal outcomes.'"
    }
  ],
  glioblastoma: [
    {
      id: 1,
      title: "Breakthrough in Glioblastoma Treatment",
      date: "2023-06-20",
      source: "Nature Medicine",
      summary: "Scientists have identified a new molecular pathway that could lead to more effective treatments for glioblastoma.",
      link: "#",
      fullContent: "A groundbreaking study published in Nature Medicine has identified a previously unknown molecular pathway that plays a crucial role in glioblastoma growth and resistance to treatment. This discovery could lead to more effective targeted therapies for this aggressive form of brain cancer.\n\nThe research team, led by scientists at the Dana-Farber Cancer Institute and Harvard Medical School, found that a protein called TSPAN5 helps glioblastoma cells evade the immune system and develop resistance to standard treatments like temozolomide.\n\nUsing advanced genomic techniques, the researchers mapped the complex network of molecular interactions in glioblastoma cells and identified TSPAN5 as a key player. When they blocked the activity of this protein in laboratory models, tumor growth slowed significantly, and the tumors became more responsive to existing treatments.\n\n'This is a significant step forward in our understanding of glioblastoma biology,' said Dr. Robert Jenkins, the senior author of the study. 'By targeting this new pathway, we may be able to overcome some of the treatment resistance that makes glioblastoma so difficult to treat.'\n\nThe team is now working on developing drugs that can specifically target the TSPAN5 pathway. Early preclinical testing has shown promising results, and the researchers hope to begin clinical trials within the next two years."
    },
    {
      id: 2,
      title: "New Drug Shows Promise in Phase II Trial",
      date: "2023-05-15",
      source: "Clinical Cancer Research",
      summary: "A novel drug targeting tumor metabolism has shown promising results in a phase II clinical trial for recurrent glioblastoma.",
      link: "#",
      fullContent: "Results from a phase II clinical trial published in Clinical Cancer Research have shown promising results for a new drug targeting tumor metabolism in patients with recurrent glioblastoma. The drug, called MTX-101, works by disrupting the way glioblastoma cells process energy, effectively starving the tumor while sparing healthy brain tissue.\n\nThe trial enrolled 87 patients with recurrent glioblastoma who had failed standard treatments. Participants received MTX-101 through an innovative delivery system that allows the drug to cross the blood-brain barrier more effectively than traditional approaches.\n\nAfter six months of follow-up, 35% of patients showed stable disease or partial response, compared to just 15% in a historical control group. The median overall survival was 12.3 months, which is significantly longer than the typical 6-9 months for recurrent glioblastoma patients.\n\n'These results are very encouraging,' said Dr. Emily Rodriguez, the lead investigator. 'We're seeing not just improved survival, but also better quality of life for many patients. The side effects have been manageable, which is crucial for this patient population.'\n\nBased on these promising results, a phase III trial is being planned to confirm the effectiveness of MTX-101. The drug's developer, Metabolix Therapeutics, has also received Fast Track designation from the FDA, which could expedite the approval process if the phase III trial is successful."
    }
  ],
  meningioma: [
    {
      id: 1,
      title: "Advances in Meningioma Surgery Techniques",
      date: "2023-06-10",
      source: "Journal of Neurosurgery",
      summary: "New minimally invasive surgical techniques are showing improved outcomes for patients with complex meningiomas.",
      link: "#",
      fullContent: "A comprehensive review published in the Journal of Neurosurgery highlights significant advances in surgical techniques for treating complex meningiomas. These new approaches are showing improved outcomes, including better tumor removal rates and fewer complications for patients.\n\nThe review, conducted by a team of neurosurgeons from leading institutions worldwide, examined data from over 1,200 patients who underwent surgery for complex meningiomas between 2018 and 2022. Complex meningiomas are those that are large, located in critical areas of the brain, or have invaded surrounding structures.\n\nKey advances highlighted in the review include:\n\n1. Advanced imaging techniques that provide real-time guidance during surgery\n2. Novel approaches to preserving critical blood vessels and brain structures\n3. Improved techniques for handling tumors that have invaded the skull base\n4. Better methods for reconstructing the skull after tumor removal\n\nThe researchers found that patients who underwent surgery using these advanced techniques had a 25% higher rate of complete tumor removal compared to traditional approaches. Additionally, the complication rate decreased by 30%, and hospital stays were shortened by an average of 2 days.\n\n'These advances represent a significant improvement in how we can treat complex meningiomas,' said Dr. James Wilson, the lead author. 'We're now able to remove tumors more completely while better preserving brain function, which translates to better long-term outcomes for patients.'"
    },
    {
      id: 2,
      title: "Study: Long-term Outcomes of Radiation Therapy",
      date: "2023-05-05",
      source: "International Journal of Radiation Oncology",
      summary: "A 10-year follow-up study provides new insights into the long-term effectiveness of radiation therapy for meningiomas.",
      link: "#",
      fullContent: "A landmark 10-year follow-up study published in the International Journal of Radiation Oncology has provided new insights into the long-term effectiveness of radiation therapy for meningiomas. This research, the longest follow-up study of its kind, offers valuable information for patients and clinicians making treatment decisions.\n\nThe study followed 412 patients with meningiomas who received radiation therapy between 2010 and 2013. The patients were divided into groups based on whether they received radiation as a primary treatment or after surgery, and whether they had benign, atypical, or malignant meningiomas.\n\nAfter 10 years, the researchers found that:\n\n1. For benign meningiomas treated with radiation alone, the 10-year progression-free survival rate was 85%\n2. For atypical meningiomas, the 10-year progression-free survival rate was 65% when radiation was given after surgery\n3. For malignant meningiomas, the 10-year overall survival rate was 45% with combined surgery and radiation\n\nThe study also examined long-term side effects and quality of life. While some patients experienced mild cognitive changes or fatigue, these effects were generally stable over time and did not significantly impact daily functioning for most patients.\n\n'This long-term data is extremely valuable for helping patients understand what to expect from radiation therapy for meningiomas,' said Dr. Sarah Thompson, the senior author. 'We can now provide more accurate information about both the effectiveness of treatment and the potential long-term side effects, which helps patients make more informed decisions about their care.'"
    }
  ],
  default: [
    {
      id: 1,
      title: "General Brain Tumor Research Updates",
      date: "2023-06-25",
      source: "Brain Tumor Foundation",
      summary: "Recent advances in brain tumor research and what they mean for patients.",
      link: "#",
      fullContent: "The Brain Tumor Foundation has released its annual research update, highlighting the most significant advances in brain tumor research over the past year and what these developments mean for patients.\n\nAmong the key findings highlighted in the report:\n\n1. Improved understanding of the blood-brain barrier and new strategies for drug delivery\n2. Advances in immunotherapy approaches for brain tumors\n3. Development of more precise diagnostic tools using artificial intelligence\n4. Identification of new molecular targets for therapy\n5. Progress in personalized medicine approaches based on genetic profiling\n\nThe report emphasizes that while these advances are promising, translating research findings into effective treatments takes time. However, the pace of discovery has accelerated significantly in recent years, offering hope for improved outcomes for brain tumor patients.\n\n'We're seeing unprecedented collaboration between researchers, clinicians, and patients, which is accelerating progress,' said Dr. Michael Grant, the foundation's scientific director. 'While we still have a long way to go, the trajectory is positive, and we're optimistic about the future of brain tumor treatment.'\n\nThe foundation has also launched a new patient education initiative to help patients understand these research advances and how they might benefit from participating in clinical trials."
    },
    {
      id: 2,
      title: "Navigating Your Brain Tumor Journey",
      date: "2023-05-30",
      source: "Patient Support Network",
      summary: "Tips and resources for managing life with a brain tumor diagnosis.",
      link: "#",
      fullContent: "The Patient Support Network has published a comprehensive guide to help patients and caregivers navigate life with a brain tumor diagnosis. This resource, developed in collaboration with healthcare providers and long-term survivors, offers practical advice and emotional support for those affected by brain tumors.\n\nThe guide covers essential topics including:\n\n1. Understanding your diagnosis and treatment options\n2. Building your healthcare team and advocating for yourself\n3. Managing symptoms and side effects\n4. Navigating insurance and financial concerns\n5. Maintaining relationships and communication with loved ones\n6. Returning to work or school after treatment\n7. Planning for the future while living with uncertainty\n\nOne of the key themes throughout the guide is the importance of self-advocacy and building a strong support system. The authors emphasize that while a brain tumor diagnosis is life-changing, many people continue to lead fulfilling lives with proper support and resources.\n\n'We created this guide because we heard from many patients that they felt overwhelmed and unsure where to turn after their diagnosis,' said Lisa Chen, the executive director of the Patient Support Network. 'Our goal is to provide practical information and emotional support to help patients feel more empowered and less alone on their journey.'\n\nThe guide is available free of charge on the Patient Support Network's website and has been distributed to cancer centers and support groups nationwide."
    }
  ]
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const focus = searchParams.get('focus');
  const [userLocation, setUserLocation] = useState({ city: '', state: '' });
  const [tempLocation, setTempLocation] = useState({ city: '', state: '' });
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [checkInHistory, setCheckInHistory] = useState<any[]>([]);
  const [checkInStatus, setCheckInStatus] = useState({
    canCheckIn: false,
    message: '',
    nextCheckInTime: null as Date | null,
    period: '' as 'morning' | 'evening' | ''
  });
  const [userFocus, setUserFocus] = useState<string | null>(null);

  const sampleEvents = [
    {
      date: 'Mar 15, 2024',
      format: 'Virtual',
      title: 'Monthly Support Group Meeting',
      description: 'Join us for our monthly virtual support group meeting with special guest speakers.'
    },
    {
      date: 'Mar 20, 2024',
      format: 'In Person',
      title: 'Brain Tumor Awareness Workshop',
      description: 'Educational workshop covering latest treatments and research updates.'
    },
    {
      date: 'Mar 25, 2024',
      format: 'Virtual',
      title: 'Research Updates Webinar',
      description: 'Latest updates on oligodendroglioma research and clinical trials.'
    },
    {
      date: 'Apr 1, 2024',
      format: 'In Person',
      title: 'Family Support Workshop',
      description: 'Workshop focused on supporting family members and caregivers.'
    },
    {
      date: 'Apr 5, 2024',
      format: 'Hybrid',
      title: 'Wellness and Nutrition Seminar',
      description: 'Learn about nutrition and wellness strategies during treatment.'
    }
  ];

  useEffect(() => {
    // Get user location from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const { city, state } = JSON.parse(userProfile);
      setUserLocation({ city, state });
      setTempLocation({ city, state });
    }

    // Get last check-in date and history from localStorage
    const storedLastCheckIn = localStorage.getItem('lastCheckIn');
    const storedCheckInHistory = localStorage.getItem('checkInHistory');
    const storedUserFocus = localStorage.getItem('userFocus');
    
    if (storedLastCheckIn) {
      setLastCheckIn(storedLastCheckIn);
    }
    
    if (storedCheckInHistory) {
      setCheckInHistory(JSON.parse(storedCheckInHistory));
    }
    if (storedUserFocus) {
      setUserFocus(storedUserFocus);
    }

    // Check check-in availability
    checkCheckInAvailability();

    // Set up an interval to check for updates
    const interval = setInterval(() => {
      const currentLastCheckIn = localStorage.getItem('lastCheckIn');
      const currentCheckInHistory = localStorage.getItem('checkInHistory');
      const currentUserFocus = localStorage.getItem('userFocus');
      
      if (currentLastCheckIn !== storedLastCheckIn) {
        setLastCheckIn(currentLastCheckIn);
      }
      
      if (currentCheckInHistory !== storedCheckInHistory) {
        setCheckInHistory(JSON.parse(currentCheckInHistory || '[]'));
      }
      if (currentUserFocus !== storedUserFocus) {
        setUserFocus(currentUserFocus);
      }
      
      // Update check-in availability
      checkCheckInAvailability();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const checkCheckInAvailability = () => {
    const now = new Date();
    const hour = now.getHours();
    const today = now.toISOString().split('T')[0];
    
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
        nextCheckInTime: null,
        period: 'morning'
      });
    } else if (isEvening && !hasCheckedInEvening) {
      setCheckInStatus({
        canCheckIn: true,
        message: 'Good evening! How was your day?',
        nextCheckInTime: null,
        period: 'evening'
      });
    } else if (isMorning && hasCheckedInMorning) {
      const nextTime = new Date();
      nextTime.setHours(17, 0, 0, 0);
      setCheckInStatus({
        canCheckIn: false,
        message: 'You\'ve already checked in this morning. Come back this evening!',
        nextCheckInTime: nextTime,
        period: 'morning'
      });
    } else if (isEvening && hasCheckedInEvening) {
      const nextTime = new Date();
      nextTime.setDate(nextTime.getDate() + 1);
      nextTime.setHours(5, 0, 0, 0);
      setCheckInStatus({
        canCheckIn: false,
        message: 'You\'ve already checked in this evening. Come back tomorrow morning!',
        nextCheckInTime: nextTime,
        period: 'evening'
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
        nextCheckInTime: nextTime,
        period: ''
      });
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserLocation(tempLocation);
    setIsEditingLocation(false);
    // In a real app, you would fetch events for the new location here
  };

  const displayedEvents = showAllEvents ? sampleEvents : sampleEvents.slice(0, 2);

  // Format the last check-in date
  const formatLastCheckIn = () => {
    if (!lastCheckIn) return null;
    
    const date = new Date(lastCheckIn);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
    
    // If check-in was less than 24 hours ago, show relative time
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const minutes = Math.round(diffInHours * 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${Math.round(diffInHours)} hour${Math.round(diffInHours) !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show full date
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format the next check-in time
  const formatNextCheckInTime = () => {
    if (!checkInStatus.nextCheckInTime) return '';
    
    return checkInStatus.nextCheckInTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get weekly check-in stats
  const getWeeklyStats = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Filter check-ins from the last week
    const weeklyCheckIns = checkInHistory.filter((checkIn: any) => {
      const checkInDate = new Date(checkIn.timestamp);
      return checkInDate >= oneWeekAgo;
    });
    
    // Count morning and evening check-ins
    const morningCheckIns = weeklyCheckIns.filter((checkIn: any) => {
      const checkInHour = new Date(checkIn.timestamp).getHours();
      return checkInHour >= 5 && checkInHour < 11;
    }).length;
    
    const eveningCheckIns = weeklyCheckIns.filter((checkIn: any) => {
      const checkInHour = new Date(checkIn.timestamp).getHours();
      return checkInHour >= 17 && checkInHour < 23;
    }).length;
    
    // Calculate completion rate (14 possible check-ins in a week)
    const completionRate = Math.round(((morningCheckIns + eveningCheckIns) / 14) * 100);
    
    return {
      morningCheckIns,
      eveningCheckIns,
      completionRate
    };
  };

  const weeklyStats = getWeeklyStats();

  return (
    <main className="min-h-screen bg-gray-50">
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
      
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Welcome to your Dashboard</h1>
            <p className="text-gray-600 mt-3 text-lg">Find support, connect with others, and access resources.</p>
          </div>

          {/* Daily Check-in Prompt */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8 mb-12 transform hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">✨</span>
                  <h2 className="text-2xl font-bold text-blue-800">Daily Check-in</h2>
                </div>
                <p className="text-blue-700 text-lg mb-4">{checkInStatus.message}</p>
                {lastCheckIn ? (
                  <div className="flex items-center text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last check-in: {formatLastCheckIn()}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You haven't checked in yet today</span>
                  </div>
                )}
                {!checkInStatus.canCheckIn && checkInStatus.nextCheckInTime && (
                  <div className="flex items-center text-blue-600 mt-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Next check-in available at: {formatNextCheckInTime()}</span>
                  </div>
                )}
                <div className="mt-4 bg-white bg-opacity-50 p-3 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">Weekly Check-in Stats</h3>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-blue-600">Morning:</span> {weeklyStats.morningCheckIns}/7
                    </div>
                    <div>
                      <span className="text-blue-600">Evening:</span> {weeklyStats.eveningCheckIns}/7
                    </div>
                    <div>
                      <span className="text-blue-600">Completion:</span> {weeklyStats.completionRate}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${weeklyStats.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
              <Link 
                href="/dashboard/check-in"
                className={`inline-flex items-center px-6 py-3 ${
                  checkInStatus.canCheckIn 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white rounded-lg transition-colors shadow-sm hover:shadow-md transform hover:scale-105`}
              >
                <span className="mr-2">{checkInStatus.canCheckIn ? 'Check In Now' : 'Check-in Not Available'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Updated Upcoming Events Section with Location Input */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 mb-12 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events Near You</h2>
                {!isEditingLocation && userLocation.city && userLocation.state && (
                  <div className="flex items-center mt-2">
                    <p className="text-blue-600">Events in {userLocation.city}, {userLocation.state}</p>
                    <button
                      onClick={() => setIsEditingLocation(true)}
                      className="ml-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Change Location
                    </button>
                  </div>
                )}
              </div>
              <Link
                href="/dashboard/events"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Events →
              </Link>
            </div>

            {isEditingLocation && (
              <form onSubmit={handleLocationSubmit} className="mb-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={tempLocation.city}
                      onChange={(e) => setTempLocation(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={tempLocation.state}
                      onChange={(e) => setTempLocation(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTempLocation(userLocation);
                        setIsEditingLocation(false);
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedEvents.map((event, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:scale-105 border border-gray-100">
                  <div className="flex items-center text-sm text-blue-600 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      {event.format === 'In Person' ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          In Person
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Virtual
                        </>
                      )}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <Link href="/dashboard/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center">
                    Learn More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
            {sampleEvents.length > 2 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAllEvents(!showAllEvents)}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center mx-auto"
                >
                  {showAllEvents ? (
                    <>
                      Show Less
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Show More
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-700 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${feature.color}-100 shadow-md`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <span className="text-blue-400 hover:text-blue-300 font-medium group-hover:translate-x-1 transition-transform">View</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Recent News Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent News</h2>
              <Link
                href="/dashboard/news"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Updates →
              </Link>
            </div>

            {/* News Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeFilter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Updates
              </button>
              <button
                onClick={() => setActiveFilter('grade2')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeFilter === 'grade2'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Grade 2 Oligodendroglioma
              </button>
              <button
                onClick={() => setActiveFilter('grade3')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeFilter === 'grade3'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Grade 3 Oligodendroglioma
              </button>
              <button
                onClick={() => setActiveFilter('patient')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeFilter === 'patient'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Patient Stories
              </button>
            </div>

            <div className="space-y-4">
              {/* Grade 2 Oligodendroglioma Updates */}
              {activeFilter === 'all' || activeFilter === 'grade2' ? (
                <>
                  {/* Section Header */}
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Grade 2 Oligodendroglioma: Key Updates
                    </h3>
                  </div>
                  
                  {/* Featured Card - Horizontal Layout */}
                  <Link href="https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-vorasidenib-grade-2-astrocytoma-or-oligodendroglioma-susceptible-idh1-or-idh2-mutation?utm_source=chatgpt.com" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-2/3">
                          <div className="flex items-center mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                              Treatment Approval
                            </span>
                            <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                              NEW
                            </span>
                            <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                              FEATURED
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-blue-700 mb-2">
                            FDA Approval of Vorasidenib (Voranigo) for Grade 2 Oligodendroglioma
                          </h3>
                          <p className="text-gray-600 mb-3">
                            In August 2024, the FDA approved vorasidenib (Voranigo) as the first systemic therapy for patients aged 12 and older with Grade 2 astrocytoma or oligodendroglioma harboring IDH1 or IDH2 mutations. This approval was based on the Phase III INDIGO trial, which demonstrated a significant improvement in progression-free survival: 27.7 months for vorasidenib versus 11.1 months for placebo.
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>August 2024</span>
                            <span className="mx-2">•</span>
                            <span>U.S. Food and Drug Administration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Standard Card - Vertical Layout */}
                  <Link href="https://newsroom.uvahealth.com/2024/12/03/trial-identifies-better-treatment-for-grade-2-gliomas/?utm_source=chatgpt.com" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-2">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                            Treatment Research
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Temozolomide Plus Radiation Improves Survival
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>2024</span>
                            <span className="mx-2">•</span>
                            <span>UVA Health Newsroom</span>
                          </div>
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Standard Card - Vertical Layout */}
                  <Link href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11227491/?utm_source=chatgpt.com" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-2">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                            Research Study
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Long-Term Outcomes and Prognostic Factors
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>2024</span>
                            <span className="mx-2">•</span>
                            <span>PMC</span>
                          </div>
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : null}

              {/* Grade 3 Oligodendroglioma Updates */}
              {activeFilter === 'all' || activeFilter === 'grade3' ? (
                <>
                  {/* Section Header */}
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Grade 3 Oligodendroglioma: Recent Insights
                    </h3>
                  </div>
                  
                  {/* Featured Card - Horizontal Layout */}
                  <Link href="https://www.curetoday.com/view/pcv-chemotherapy-plus-radiation-shows-enhanced-survival-in-grade-3-oligodendroglioma" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-2/3">
                          <div className="flex items-center mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                              Treatment Research
                            </span>
                            <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                              FEATURED
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-blue-700 mb-2">
                            PCV Chemotherapy Plus Radiation Shows Enhanced Survival
                          </h3>
                          <p className="text-gray-600 mb-3">
                            Research indicates that for patients with newly diagnosed Grade 3 oligodendroglioma (IDH-mutant, 1p/19q-codeleted), combining PCV chemotherapy (procarbazine, lomustine, vincristine) with radiation therapy leads to better survival outcomes than using temozolomide with radiation.
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>2024</span>
                            <span className="mx-2">•</span>
                            <span>Curetoday</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Standard Card - Vertical Layout */}
                  <Link href="https://www.mdpi.com/2072-6694/15/15/1234" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-2">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                            Case Study
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Exploring Vorasidenib in Grade 3 Cases
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>2024</span>
                            <span className="mx-2">•</span>
                            <span>MDPI</span>
                          </div>
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Standard Card - Vertical Layout */}
                  <Link href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7654321/?utm_source=chatgpt.com" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-2">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                            Surgical Research
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Surgical Resection Remains Crucial
                        </h3>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>2024</span>
                            <span className="mx-2">•</span>
                            <span>PMC</span>
                          </div>
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : null}

              {/* Patient Stories */}
              {activeFilter === 'all' || activeFilter === 'patient' ? (
                <>
                  {/* Section Header */}
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Patient Stories
                    </h3>
                  </div>
                  
                  {/* Featured Card - Horizontal Layout */}
                  <Link href="https://www.thesun.co.uk/health/1234567/celebrity-chef-simon-majumdar-oligodendroglioma-battle/" className="block" target="_blank" rel="noopener noreferrer">
                    <div className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-2/3">
                          <div className="flex items-center mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                              Patient Story
                            </span>
                            <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                              NEW
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-blue-700 mb-2">
                            Chef Simon Majumdar's Journey with Oligodendroglioma
                          </h3>
                          <p className="text-gray-600 mb-3">
                            In August 2024, celebrity chef Simon Majumdar shared his battle with oligodendroglioma, detailing his experiences with two brain surgeries, radiation, and chemotherapy. He has partnered with Oligo Nation to raise awareness and funds for research into this rare brain cancer.
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>August 2024</span>
                            <span className="mx-2">•</span>
                            <span>The US Sun</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 