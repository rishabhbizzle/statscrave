"use client";
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { RATING_CONFIG } from '@/constants/reviewConstants';

const ReviewItem = ({ review }) => {
    const { user: currentUser } = useUser();
    const [likes, setLikes] = useState(review.likes || []);
    const [isLiked, setIsLiked] = useState(currentUser ? review.likes.includes(currentUser.id) : false);

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
            const res = await fetch(`/api/reviews/${review._id}/like`, { method: 'POST' });
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
        <div className="border-b border-white/10 py-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img 
                        src={review.user?.imageUrl || '/placeholder-user.jpg'} 
                        alt={review.user?.firstName || 'User'} 
                        className="w-10 h-10 rounded-full object-cover bg-gray-800"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">
                                {review.user?.firstName} {review.user?.lastName}
                            </span>
                            {review.user?.username && (
                                <span className="text-xs text-gray-500">@{review.user.username}</span>
                            )}
                        </div>
                        <span className="text-xs text-gray-400">
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

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {review.reviewText}
            </p>

            <div className="flex items-center gap-4">
                <button 
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
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
            <div className="text-center py-10 text-gray-500">
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
