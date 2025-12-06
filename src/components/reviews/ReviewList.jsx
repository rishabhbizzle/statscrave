"use client";
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react';
import { useUser, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { RATING_CONFIG } from '@/constants/reviewConstants';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton component for loading state
const ReviewItemSkeleton = () => (
    <div className="border-b border-border py-6 last:border-0">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full mb-3" />
        <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="h-4 w-12" />
    </div>
);

export const ReviewListSkeleton = ({ count = 5 }) => (
    <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
            <ReviewItemSkeleton key={i} />
        ))}
    </div>
);

const ReviewItem = ({ review }) => {
    const { user: currentUser } = useUser();
    const { getToken } = useAuth();
    const [likes, setLikes] = useState(review.likes || []);
    const [isLiked, setIsLiked] = useState(currentUser ? (review.likes || []).includes(currentUser.id) : false);

    const handleLike = async () => {
        if (!currentUser) {
            toast.error("Please sign in to like reviews");
            return;
        }

        // Optimistic update
        const originalLikes = [...likes];
        const originalIsLiked = isLiked;

        if (isLiked) {
            setLikes(likes.filter(id => id !== currentUser.id));
            setIsLiked(false);
        } else {
            setLikes([...likes, currentUser.id]);
            setIsLiked(true);
        }

        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${review._id}/like`, { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Failed to like");
        } catch (error) {
            // Revert
            setLikes(originalLikes);
            setIsLiked(originalIsLiked);
            toast.error("Failed to update like");
        }
    };

    const badge = RATING_CONFIG[review.rating];

    return (
        <div className="border-b border-border py-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img 
                        src={review.user?.imageUrl || '/placeholder-user.jpg'} 
                        alt={review.user?.firstName || 'User'} 
                        className="w-10 h-10 rounded-full object-cover bg-muted"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                                {review.user?.firstName} {review.user?.lastName}
                            </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>

            {badge && (
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${badge.bg} ${badge.text} bg-opacity-20`}>
                    {badge.label}
                </div>
            )}

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {review.reviewText}
            </p>

            <div className="flex items-center gap-4">
                <button 
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-pink-500' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likes.length}</span>
                </button>
                {/* Add comment button if needed later */}
            </div>
        </div>
    );
};

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No reviews yet. Be the first to review!
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {reviews.map(review => (
                <ReviewItem key={review._id} review={review} />
            ))}
        </div>
    );
};

export default ReviewList;
