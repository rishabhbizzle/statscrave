"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { RATING_OPTIONS } from '@/constants/reviewConstants';

const ReviewForm = ({ targetId, targetType, onReviewSubmitted, initialReview }) => {
    const { user, isLoaded } = useUser();
    const [rating, setRating] = useState(initialReview?.rating || null);
    const [reviewText, setReviewText] = useState(initialReview?.reviewText || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialReview) {
            setRating(initialReview.rating);
            setReviewText(initialReview.reviewText);
        }
    }, [initialReview]);

    if (!isLoaded) return null;
    if (!user) return (
        <div className="p-6 bg-black/40 border border-white/10 rounded-xl text-center">
            <p className="text-gray-400">Please sign in to leave a review.</p>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetId,
                    targetType,
                    rating,
                    reviewText
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to submit review");

            toast.success("Review submitted!");
            setRating(null);
            setReviewText('');
            if (onReviewSubmitted) onReviewSubmitted(data.review);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
                <img src={user.imageUrl} alt={user.fullName} className="w-10 h-10 rounded-full" />
                <div>
                    <h4 className="font-semibold text-white">{user.fullName}</h4>
                    <p className="text-xs text-gray-400">@{user.username}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {RATING_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setRating(option.value)}
                            className={`py-2 px-1 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                                rating === option.value 
                                    ? `${option.bg} text-white ring-2 ring-white/20` 
                                    : `bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white`
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 min-h-[100px]"
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Review'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
