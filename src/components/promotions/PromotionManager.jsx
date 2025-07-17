"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import AnnouncementBar from "./AnnouncementBar";
import SmartModal from "./SmartModal";
import { PROMOTION_CONFIG } from "@/constants/promotions";

const PromotionManager = () => {
  const { user, isLoaded } = useUser();
  const [userActivity, setUserActivity] = useState({});

  useEffect(() => {
    // Don't render promotions until user data is loaded
    if (!isLoaded) return;
    
    // Don't render if promotions are globally disabled
    if (!PROMOTION_CONFIG.enabled) return;

    // Gather user activity data
    const activity = {
      // User info (if available)
      userId: user?.id || null,
      isReturningUser: !!localStorage.getItem('user_visited_before'),
      
      // Page activity
      pageViews: parseInt(localStorage.getItem('total_page_views') || '0'),
      sessionPageViews: parseInt(sessionStorage.getItem('session_page_views') || '0'),
      
      // Time-based info
      firstVisit: localStorage.getItem('first_visit_date'),
      lastVisit: localStorage.getItem('last_visit_date'),
      
      // User preferences
      userSegment: user?.publicMetadata?.segment || 'free',
      location: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    setUserActivity(activity);

    // Track this page view
    const newPageViews = activity.pageViews + 1;
    const newSessionViews = activity.sessionPageViews + 1;
    
    localStorage.setItem('total_page_views', newPageViews.toString());
    sessionStorage.setItem('session_page_views', newSessionViews.toString());
    
    // Mark user as returning visitor
    if (!activity.isReturningUser) {
      localStorage.setItem('user_visited_before', 'true');
      localStorage.setItem('first_visit_date', new Date().toISOString());
    }
    localStorage.setItem('last_visit_date', new Date().toISOString());

  }, [user, isLoaded]);

  // Don't render anything if promotions are disabled or user not loaded
  if (!PROMOTION_CONFIG.enabled || !isLoaded) {
    return null;
  }

  return (
    <>
      {/* Announcement Bar */}
      <AnnouncementBar 
        userActivity={userActivity}
        className="z-50" 
      />
      
      {/* Smart Modal */}
      <SmartModal 
        userActivity={userActivity}
      />
    </>
  );
};

export default PromotionManager; 