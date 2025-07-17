"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { 
  getPromotionsForDisplay, 
  shouldShowPromotion, 
  dismissPromotion,
  PROMOTION_CONFIG 
} from "@/constants/promotions";

const SmartModal = ({ userActivity = {} }) => {
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activePromotions, setActivePromotions] = useState([]);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [sessionPromotionCount, setSessionPromotionCount] = useState(0);
  
  // Behavior tracking
  const [scrollPercent, setScrollPercent] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  const timerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.floor((scrollTop / docHeight) * 100);
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Track exit intent (mouse leaving viewport)
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setIsExiting(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Load promotions
  useEffect(() => {
    const promotions = getPromotionsForDisplay("modal");
    const validPromotions = promotions.filter(promo => 
      shouldShowPromotion(promo.id, userActivity)
    );

    setActivePromotions(validPromotions);
    
    // Check session limits
    const sessionCount = sessionStorage.getItem('promotion_modal_count') || '0';
    setSessionPromotionCount(parseInt(sessionCount));
  }, [userActivity]);

  // Auto-rotate between promotions when modal is visible
  useEffect(() => {
    if (isVisible && activePromotions.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromotionIndex((prev) => (prev + 1) % activePromotions.length);
      }, 5000); // Rotate every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isVisible, activePromotions.length]);

  // Smart triggering logic
  useEffect(() => {
    if (activePromotions.length === 0 || hasTriggeredRef.current || hasShownModal) return;
    if (sessionPromotionCount >= PROMOTION_CONFIG.maxPromotionsPerSession) return;

    // Use the first (highest priority) promotion for timing
    const triggerPromo = activePromotions[0];
    if (!triggerPromo) return;

    const config = triggerPromo.modalConfig;
    
    const shouldTrigger = () => {
      // Page load trigger
      if (config.showOnPageLoad && timeOnPage >= 2) {
        return { reason: 'page_load', delay: 0 };
      }
      
      // Scroll trigger
      if (config.showAfterScrollPercent > 0 && scrollPercent >= config.showAfterScrollPercent) {
        return { reason: 'scroll', delay: 1000 };
      }
      
      // Time trigger
      if (config.showAfterTimeSeconds > 0 && timeOnPage >= config.showAfterTimeSeconds) {
        return { reason: 'time', delay: 0 };
      }
      
      // Exit intent trigger
      if (config.showOnExit && isExiting && timeOnPage >= 5) {
        return { reason: 'exit_intent', delay: 500 };
      }
      
      return null;
    };

    const trigger = shouldTrigger();
    if (trigger) {
      hasTriggeredRef.current = true;
      
      setTimeout(() => {
        setIsVisible(true);
        setHasShownModal(true);
        
        // Update session count
        const newCount = sessionPromotionCount + 1;
        setSessionPromotionCount(newCount);
        sessionStorage.setItem('promotion_modal_count', newCount.toString());
        
        // Modal triggered
      }, trigger.delay);
    }
  }, [activePromotions, timeOnPage, scrollPercent, isExiting, hasShownModal, sessionPromotionCount]);

  const handleClose = () => {
    // Dismiss all active promotions
    activePromotions.forEach(promo => {
      dismissPromotion(promo.id);
    });
    
    setIsVisible(false);
  };

  const handleCTAClick = (cta, promotion) => {
    if (cta.external) {
      window.open(cta.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = cta.url;
    }
  };

  const handleNextPromotion = () => {
    setCurrentPromotionIndex((prev) => (prev + 1) % activePromotions.length);
  };

  const handlePrevPromotion = () => {
    setCurrentPromotionIndex((prev) => 
      prev === 0 ? activePromotions.length - 1 : prev - 1
    );
  };

  if (!isVisible || activePromotions.length === 0) {
    return null;
  }

  const currentPromotion = activePromotions[currentPromotionIndex];

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent 
        className="max-w-lg w-[90%] mx-auto p-0 overflow-hidden border-0 bg-white dark:bg-gray-900 shadow-2xl [&>button]:hidden fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white dark:bg-gray-900 rounded-xl"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Multi-promotion dots */}
          {activePromotions.length > 1 && (
            <div className="absolute top-3 left-3 z-10 flex space-x-2">
              {activePromotions.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentPromotionIndex 
                      ? "bg-green-600" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  )}
                  onClick={() => setCurrentPromotionIndex(index)}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromotion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-center space-y-6"
              >
                {/* Album Art */}
                {currentPromotion.albumArt && (
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="relative"
                    >
                      <img 
                        src={currentPromotion.albumArt} 
                        alt={`${currentPromotion.artist} - ${currentPromotion.songTitle}`}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-lg object-cover"
                      />
                    </motion.div>
                  </div>
                )}

                {/* Text Content */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {currentPromotion.title}
                    </h2>
                    {currentPromotion.subtitle && (
                      <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                        {currentPromotion.subtitle}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    
                    {currentPromotion.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        {currentPromotion.description}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
                >
                  {currentPromotion.ctas.map((cta, index) => (
                    <Button
                      key={index}
                      variant={cta.variant}
                      size="lg"
                      className={cn(
                        "font-semibold min-w-[140px]",
                        cta.variant === "default" && "bg-green-600 text-white hover:bg-green-700",
                        cta.variant === "outline" && "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/20",
                        cta.variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      )}
                      onClick={() => handleCTAClick(cta, currentPromotion)}
                    >
                      {cta.label}
                      {cta.external && <ExternalLink className="ml-2 h-4 w-4" />}
                    </Button>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows for multiple promotions */}
          {activePromotions.length > 1 && (
            <>
              <button
                onClick={handlePrevPromotion}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-60 hover:opacity-100"
              >
                <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextPromotion}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-60 hover:opacity-100"
              >
                <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartModal; 