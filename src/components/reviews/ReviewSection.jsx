"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Meter from './Meter';
import ReviewForm from './ReviewForm';
import ReviewList, { ReviewListSkeleton } from './ReviewList';
import { Loader2 } from 'lucide-react';

import { useUser, useAuth } from "@clerk/nextjs";

const ReviewSection = ({ targetId, targetType, targetName, coverImage, artistName }) => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({ total: 0, counts: {} });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('newest');
    const [hasMore, setHasMore] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [userReview, setUserReview] = useState(null);

    const fetchUserReview = useCallback(async () => {
        if (!user) return;
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/user?targetId=${targetId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setUserReview(data.review);
            }
        } catch (error) {
            console.error("Failed to fetch user review:", error);
        }
    }, [targetId, user, getToken]);

    const fetchReviews = useCallback(async (pageNum, sortOption) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setIsFetchingMore(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews?targetId=${targetId}&page=${pageNum}&limit=25&sort=${sortOption}`);
            const data = await res.json();
            
            if (data.success) {
                if (pageNum === 1) {
                    setReviews(data.reviews);
                } else {
                    setReviews(prev => [...prev, ...data.reviews]);
                }
                setStats(data.stats);
                setHasMore(data?.pagination?.hasMore);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    }, [targetId]);

    useEffect(() => {
        fetchReviews(1, sort);
        fetchUserReview();
    }, [fetchReviews, fetchUserReview, sort]);

    const handleReviewSubmitted = async (newReview) => {
        setPage(1);
        setSort('newest');
        await fetchReviews(1, 'newest');
        await fetchUserReview();
    };

    const handleReviewDeleted = async () => {
        setUserReview(null);
        setPage(1);
        setSort('newest');
        await fetchReviews(1, 'newest');
    };

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchReviews(nextPage, sort);
    };

    return (
        <div className="mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Meter */}
                <div className="md:col-span-1">
                    <div className="sticky top-24">
                        <Meter stats={stats} targetName={targetName} targetType={targetType} coverImage={coverImage} artistName={artistName} />
                    </div>
                </div>

                {/* Right Column: Reviews & Form */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            {userReview ? "Update Your Review" : "Write a Review"}
                        </h3>
                        <ReviewForm 
                            targetId={targetId} 
                            targetType={targetType}
                            targetName={targetName}
                            coverImage={coverImage}
                            artistName={artistName}
                            onReviewSubmitted={handleReviewSubmitted}
                            onReviewDeleted={handleReviewDeleted}
                            initialReview={userReview}
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-foreground">Reviews</h3>
                            <select 
                                value={sort} 
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setPage(1);
                                }}
                                className="bg-secondary border border-border text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
                            >
                                <option value="newest">Newest First</option>
                                <option value="most_liked">Most Liked</option>
                            </select>
                        </div>
                        
                        {loading && page === 1 ? (
                            <ReviewListSkeleton count={3} />
                        ) : (
                            <>
                                <ReviewList reviews={reviews} />
                                
                                {hasMore && (
                                    <div className="mt-6 flex justify-center">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={isFetchingMore}
                                            className="px-6 py-2 bg-muted hover:bg-muted/80 border border-border rounded-full text-sm font-medium text-foreground transition-colors disabled:opacity-50"
                                        >
                                            {isFetchingMore ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Loading...
                                                </span>
                                            ) : (
                                                "Load More Reviews"
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
