"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  getPromotionsForDisplay, 
  shouldShowPromotion, 
  dismissPromotion 
} from "@/constants/promotions";

const AnnouncementBar = ({ className, userActivity = {} }) => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activePromotions, setActivePromotions] = useState([]);

  useEffect(() => {
    // Get promotions for announcement bar
    const promotions = getPromotionsForDisplay("announcement_bar");
    
    // Filter based on user targeting
    const validPromotions = promotions.filter(promo => 
      shouldShowPromotion(promo.id, userActivity)
    );

    setActivePromotions(validPromotions);
    
    if (validPromotions.length > 0) {
      setIsVisible(true);
    }
  }, [userActivity]);

  useEffect(() => {
    // Auto-rotate promotions if multiple exist
    if (activePromotions.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromoIndex((prev) => {
          const nextIndex = (prev + 1) % activePromotions.length;
          return nextIndex;
        });
      }, 8000); // Change every 8 seconds

      return () => clearInterval(interval);
    }
  }, [activePromotions]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentPromo = activePromotions[currentPromoIndex];
    if (currentPromo) {
      dismissPromotion(currentPromo.id);
    }
    
    setIsVisible(false);
  };

  const handleCTAClick = (cta, promotion) => {
    if (cta.external) {
      window.open(cta.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = cta.url;
    }
  };

  const handleBarClick = (promotion) => {
    if (promotion.ctas.length === 1) {
      handleCTAClick(promotion.ctas[0], promotion);
    }
  };

  if (!isVisible || activePromotions.length === 0) {
    return null;
  }

  const currentPromotion = activePromotions[currentPromoIndex];
  const position = currentPromotion?.barConfig?.position || "top";
  const isSticky = currentPromotion?.barConfig?.sticky;
  const isDismissible = currentPromotion?.barConfig?.dismissible;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: position === "top" ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === "top" ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "hidden md:block w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 dark:from-green-700 dark:via-green-600 dark:to-emerald-800 text-white relative z-50 border-b border-green-500/20",
            isSticky && (position === "top" ? "sticky top-0" : "sticky bottom-0"),
            !isSticky && (position === "top" ? "relative" : "relative"),
            className
          )}
        >
          <div 
            className={cn(
              "container mx-auto px-4 py-3 flex items-center justify-between cursor-pointer",
              currentPromotion.ctas.length === 1 && "hover:bg-black/10 transition-colors"
            )}
            onClick={() => handleBarClick(currentPromotion)}
          >
            {/* Left side - Content */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <Music className="h-5 w-5" />
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <span>{currentPromotion.title}</span>
                  {currentPromotion.subtitle && (
                    <>
                      <span className="opacity-75">•</span>
                      <span className="opacity-90">{currentPromotion.subtitle}</span>
                    </>
                  )}
                </div>
                
                <div className="text-xs opacity-80 truncate">
                  {currentPromotion.artist} - {currentPromotion.songTitle}
                </div>
              </div>
            </div>

            {/* Center - CTA Buttons (if multiple) */}
            {currentPromotion.ctas.length > 1 && (
              <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
                {currentPromotion.ctas.slice(0, 3).map((cta, index) => (
                  <Button
                    key={index}
                    variant={cta.variant === "default" ? "secondary" : "outline"}
                    size="sm"
                    className={cn(
                      "text-xs px-3 py-1 h-auto",
                      cta.variant === "default" 
                        ? "bg-white text-green-700 hover:bg-gray-100 font-medium" 
                        : "border-white/50 text-white hover:bg-white/10"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCTAClick(cta, currentPromotion);
                    }}
                  >
                    {cta.label}
                    {cta.external && <ExternalLink className="ml-1 h-3 w-3" />}
                  </Button>
                ))}
              </div>
            )}

            {/* Mobile CTA for single button */}
            {currentPromotion.ctas.length === 1 && (
              <div className="md:hidden flex-shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs px-3 py-1 h-auto bg-white text-green-700 hover:bg-gray-100 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCTAClick(currentPromotion.ctas[0], currentPromotion);
                  }}
                >
                  {currentPromotion.ctas[0].label}
                  {currentPromotion.ctas[0].external && <ExternalLink className="ml-1 h-3 w-3" />}
                </Button>
              </div>
            )}

            {/* Right side - Dismiss button and rotation indicator */}
            <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
              {/* Rotation dots */}
              {activePromotions.length > 1 && (
                <div className="hidden sm:flex space-x-1">
                  {activePromotions.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        index === currentPromoIndex 
                          ? "bg-white" 
                          : "bg-white/40 hover:bg-white/60"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPromoIndex(index);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Dismiss button */}
              {isDismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-white hover:bg-white/10"
                  onClick={handleDismiss}
                  aria-label="Dismiss promotion"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Progress bar for rotation */}
          {activePromotions.length > 1 && (
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-white/30"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;