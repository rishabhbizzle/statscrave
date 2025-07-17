// Promotion configurations - Easy to manage and remove
export const PROMOTION_CONFIG = {
  // Global settings
  enabled: true, // Set to false to disable all promotions
  maxPromotionsPerSession: 3, // Allow more promotions per session
  cooldownHours: 12, // Reduced cooldown for better user experience
  
  // Analytics tracking disabled
  trackingEnabled: false,
};

// Individual promotions data
export const PROMOTIONS = [
  {
    id: "justin_bieber_daisies_2025",
    title: "DAISIES",
    description: "Pop prince's latest single DAISIES from his new album SWAG is available now. Stream and purchase today!",
    
    // Artist/Release info
    artist: "Justin Bieber",
    songTitle: "DAISIES",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273172de562840d588bfdda27f3",
    
    // Call-to-action buttons
    ctas: [
      {
        label: "Stream on Spotify",
        url: "https://open.spotify.com/album/5vD5M5VW62LL78Ko8x0CVZ",
        variant: "default",
        external: true
      },
      {
        label: "Buy on iTunes",
        url: "https://music.apple.com/us/song/daisies/1825994649",
        variant: "outline",
        external: true
      }
    ],
    
    // Display settings
    priority: 1, // Higher number = higher priority
    displayType: ["announcement_bar", "modal"], // Where to show this promotion
    
    // Scheduling
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    
    // Targeting (optional)
    targeting: {
      newUsersOnly: false,
      userSegments: [], 
      locations: [],
      minPageViews: 0,
    },
    
    // Modal-specific settings
    modalConfig: {
      showOnPageLoad: false,
      showAfterScrollPercent: 30,
      showAfterTimeSeconds: 4,
      showOnExit: true,
    },
    
    // Announcement bar specific
    barConfig: {
      position: "top",
      sticky: true,
      dismissible: true,
    }
  },
  
  {
    id: "bts_permission_to_dance_live_2025",
    title: "🎤 BTS - Permission to Dance On Stage LIVE",
    subtitle: "Pre-save Now - Releases July 18, 2025",
    description: "Experience BTS like never before! Their highly anticipated live album featuring all your favorite hits. Pre-save now!",
    
    artist: "BTS",
    songTitle: "Permission to Dance On Stage - Live",
    albumArt: "https://www.clashmusic.com/wp-content/uploads/2025/06/BTS-permission-to-dance.jpg",
    
    ctas: [
      {
        label: "Pre-save on Spotify",
        url: "https://open.spotify.com/prerelease/358phfp6OfvY7nO46mk94z?si=pBYTMk7nSt2t7QbHhFKLSA&context=spotify%3Aprerelease%3A358phfp6OfvY7nO46mk94z&nd=1&dlsi=8ef784ee47e647f1",
        variant: "default",
        external: true
      }
    ],
    
    priority: 2,
    displayType: ["announcement_bar", "modal"],
    
    startDate: "2025-01-01T00:00:00Z", 
    endDate: "2025-07-18T23:59:59Z", // Until release date
    
    targeting: {
      newUsersOnly: false,
      userSegments: [],
      locations: [],
      minPageViews: 2,
    },
    
    modalConfig: {
      showOnPageLoad: false,
      showAfterScrollPercent: 30,
      showAfterTimeSeconds: 4,
      showOnExit: true,
    },
    
    barConfig: {
      position: "top",
      sticky: true, 
      dismissible: true,
    }
  }
];

// Utility functions for promotion management
export const getActivePromotions = () => {
  if (!PROMOTION_CONFIG.enabled) return [];
  
  const now = new Date();
  return PROMOTIONS.filter(promo => {
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);
    return now >= start && now <= end;
  }).sort((a, b) => b.priority - a.priority);
};

export const getPromotionsForDisplay = (displayType) => {
  return getActivePromotions().filter(promo => 
    promo.displayType.includes(displayType)
  );
};

export const shouldShowPromotion = (promotionId, userActivity = {}) => {
  const promo = PROMOTIONS.find(p => p.id === promotionId);
  if (!promo) return false;
  
  // Check if user has dismissed this promotion recently
  const dismissedKey = `promo_dismissed_${promotionId}`;
  const lastDismissed = localStorage.getItem(dismissedKey);
  
  if (lastDismissed) {
    const dismissedTime = new Date(lastDismissed);
    const cooldownEnd = new Date(dismissedTime.getTime() + (PROMOTION_CONFIG.cooldownHours * 60 * 60 * 1000));
    if (new Date() < cooldownEnd) {
      return false;
    }
  }
  
  // Check targeting criteria
  const targeting = promo.targeting;
  
  if (targeting.minPageViews > 0) {
    const pageViews = userActivity.pageViews || 0;
    if (pageViews < targeting.minPageViews) return false;
  }
  
  if (targeting.newUsersOnly && userActivity.isReturningUser) {
    return false;
  }
  
  return true;
};

// Tracking disabled - no analytics needed

// Mark promotion as dismissed
export const dismissPromotion = (promotionId) => {
  const dismissedKey = `promo_dismissed_${promotionId}`;
  localStorage.setItem(dismissedKey, new Date().toISOString());
}; 