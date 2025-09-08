import React, { useState, useEffect } from 'react';
import { X, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConversionNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPeople, setCurrentPeople] = useState(47);
  
  useEffect(() => {
    // Show notification after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    // Update people count periodically
    const peopleTimer = setInterval(() => {
      setCurrentPeople(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(35, Math.min(65, newCount)); // Keep between 35-65
      });
    }, 45000);

    return () => {
      clearTimeout(timer);
      clearInterval(peopleTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-emerald-200 shadow-2xl rounded-lg p-4 max-w-sm animate-slide-up">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-emerald-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-900">Live Activity</span>
          </div>
          
          <p className="text-sm text-gray-700 mb-3">
            <span className="font-semibold text-emerald-600">{currentPeople} people</span> calculated 
            their savings today
          </p>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Clock className="w-3 h-3" />
            <span>Most saved $200+ per month</span>
          </div>
          
          <Button 
            size="sm"
            onClick={() => {
              window.open('https://platform.cloudways.com/signup', '_blank');
              setIsVisible(false);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2"
          >
            Join Them - Start FREE Trial
          </Button>
        </div>
      </div>
    </div>
  );
};