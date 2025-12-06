"use client";
import React from 'react';
import { RATING_CONFIG } from '@/constants/reviewConstants';

// Helper to truncate text
const truncateText = (text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Shareable Review Card - Apple Music inspired design
 */
export const ShareableReviewCard = React.forwardRef(({ 
    review, 
    targetName,
    targetType,
    artistName,
    coverImage,
    user 
}, ref) => {
    const badge = RATING_CONFIG[review?.rating];
    const reviewText = truncateText(review?.reviewText, 180);
    
    return (
        <div 
            ref={ref}
            style={{
                width: '1080px',
                height: '1080px',
                left: "-9999px",
                top: "-9999px",
                position: 'absolute',
                pointerEvents: 'none',
                overflow: 'hidden',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
        >
            {/* Blurred Cover Art Background */}
            {coverImage && (
                <img 
                    src={coverImage}
                    alt=""
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(120px) saturate(1.2)',
                        transform: 'scale(1.3)',
                    }}
                    crossOrigin="anonymous"
                />
            )}
            
            {/* Dark Overlay */}
            <div 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                }}
            />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '64px',
                boxSizing: 'border-box',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <span style={{ 
                        color: 'rgba(255,255,255,0.5)', 
                        fontSize: '18px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '4px',
                        fontWeight: '500',
                    }}>
                        My Review
                    </span>
                </div>

                {/* Main Content */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/* Cover Art */}
                    {coverImage && (
                        <img 
                            src={coverImage}
                            alt={targetName}
                            style={{
                                width: '260px',
                                height: '260px',
                                borderRadius: '16px',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                marginBottom: '18px',
                            }}
                            crossOrigin="anonymous"
                        />
                    )}

                    {/* Track/Album Info */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div style={{ 
                            color: '#fff', 
                            fontSize: '40px', 
                            fontWeight: '700',
                            marginBottom: '6px',
                            lineHeight: '1.2',
                        }}>
                            {targetName}
                        </div>
                        {artistName && (
                            <div style={{ 
                                color: 'rgba(255,255,255,0.7)', 
                                fontSize: '24px',
                                fontWeight: '400',
                            }}>
                                {artistName}
                            </div>
                        )}
                    </div>

                    {/* Rating Badge */}
                    {badge && (
                        <div 
                            style={{ 
                                fontSize: '30px',
                                fontWeight: '700',
                                marginBottom: '35px',
                                color: badge.color,
                            }}
                        >
                            {badge.label}
                        </div>
                    )}

                    {/* Review Text */}
                    {reviewText && (
                        <div style={{ 
                            maxWidth: '680px', 
                            textAlign: 'center',
                        }}>
                            <span style={{ 
                                color: 'rgba(255,255,255,0.8)', 
                                fontSize: '20px', 
                                lineHeight: '1.5',
                                wordBreak: 'break-word',
                            }}>
                                &quot;{reviewText}&quot;
                            </span>
                        </div>
                    )}

                    {/* User Info */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        marginTop: '32px' 
                    }}>
                        <span style={{ 
                            color: 'rgba(255,255,255,0.6)', 
                            fontSize: '17px',
                            fontWeight: '400',
                        }}>
                            — {user?.fullName || 'Anonymous'}
                        </span>
                    </div>
                </div>

                {/* Footer with Logo */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center',
                }}>
                    <img 
                        src="/logo-white.png" 
                        alt="StatsCrave" 
                        style={{ height: '50px', opacity: 0.5 }}
                        crossOrigin="anonymous"
                    />
                </div>
            </div>
        </div>
    );
});

ShareableReviewCard.displayName = 'ShareableReviewCard';

/**
 * Shareable Meter Card - Apple Music inspired design
 */
export const ShareableMeterCard = React.forwardRef(({ 
    stats, 
    targetName,
    targetType,
    artistName,
    coverImage
}, ref) => {
    const { total, counts } = stats || { total: 0, counts: {} };
    
    // Calculate percentages
    const data = Object.keys(RATING_CONFIG).map(key => {
        const config = RATING_CONFIG[key];
        return {
            name: config.label,
            value: counts?.[config.value] || 0,
            percentage: total ? Math.round(((counts?.[config.value] || 0) / total) * 100) : 0,
            color: config.color,
        };
    });

    // Get top category
    const topCategory = data.reduce((prev, current) => 
        (prev.value > current.value) ? prev : current, data[0]);

    return (
        <div 
            ref={ref}
            style={{
                width: '1080px',
                height: '1080px',
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                pointerEvents: 'none',
                overflow: 'hidden',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
        >
            {/* Blurred Cover Art Background */}
            {coverImage && (
                <img 
                    src={coverImage}
                    alt=""
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(120px) saturate(1.2)',
                        transform: 'scale(1.3)',
                    }}
                    crossOrigin="anonymous"
                />
            )}
            
            {/* Dark Overlay */}
            <div 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                }}
            />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '64px',
                boxSizing: 'border-box',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <span style={{ 
                        color: 'rgba(255,255,255,0.5)', 
                        fontSize: '18px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '4px',
                        fontWeight: '500',
                    }}>
                        StatsCrave Meter
                    </span>
                </div>

                {/* Main Content */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/* Cover Art + Info Row */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '28px', 
                        marginBottom: '30px' 
                    }}>
                        {coverImage && (
                            <img 
                                src={coverImage}
                                alt={targetName}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '12px',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                }}
                                crossOrigin="anonymous"
                            />
                        )}
                        <div>
                            <div style={{ 
                                color: 'rgba(255,255,255,0.5)', 
                                fontSize: '15px', 
                                textTransform: 'uppercase', 
                                letterSpacing: '2px',
                                marginBottom: '6px',
                                fontWeight: '500',
                            }}>
                                {targetType === 'album' ? 'Album' : 'Song'}
                            </div>
                            <div style={{ 
                                color: '#fff', 
                                fontSize: '30px', 
                                fontWeight: '700',
                                marginBottom: '4px',
                                lineHeight: '1.2',
                            }}>
                                {targetName}
                            </div>
                            {artistName && (
                                <div style={{ 
                                    color: 'rgba(255,255,255,0.7)', 
                                    fontSize: '20px',
                                    fontWeight: '400',
                                }}>
                                    {artistName}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Big Percentage */}
                    {total > 0 && topCategory && (
                        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                            <div style={{
                                fontSize: '110px',
                                fontWeight: '800',
                                lineHeight: 1,
                                color: topCategory.color,
                                marginBottom: '25px',
                            }}>
                                {topCategory.percentage}%
                            </div>
                            <div style={{
                                fontSize: '30px',
                                fontWeight: '600',
                                marginTop: '4px',
                                color: topCategory.color,
                            }}>
                                {topCategory.name}
                            </div>
                            <div style={{
                                color: 'rgba(255,255,255,0.4)',
                                fontSize: '17px',
                                marginTop: '8px',
                                fontWeight: '400',
                            }}>
                                {total} {total === 1 ? 'Vote' : 'Votes'}
                            </div>
                        </div>
                    )}

                    {/* Rating Breakdown - Compact pills */}
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center', 
                        gap: '25px',
                        maxWidth: '900px',
                    }}>
                        {[...data].reverse().map(item => (
                            <div 
                                key={item.name} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '8px',
                                }}
                            >
                                <div style={{ 
                                    color: 'rgba(255,255,255,0.8)', 
                                    fontSize: '15px',
                                    fontWeight: '500',
                                }}>
                                    {item.name}:
                                </div>
                                <span style={{
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    color: item.color,
                                }}>
                                    {item.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer with Logo */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center',
                }}>
                    <img 
                        src="/logo-white.png" 
                        alt="StatsCrave" 
                        style={{ height: '50px', opacity: 0.5 }}
                        crossOrigin="anonymous"
                    />
                </div>
            </div>
        </div>
    );
});

ShareableMeterCard.displayName = 'ShareableMeterCard';
