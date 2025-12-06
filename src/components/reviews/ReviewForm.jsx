"use client";
import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Trash2 } from 'lucide-react';

import { RATING_OPTIONS } from '@/constants/reviewConstants';
import { Card, CardContent } from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ReviewForm = ({ targetId, targetType, onReviewSubmitted, onReviewDeleted, initialReview }) => {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const [rating, setRating] = useState(initialReview?.rating || null);
    const [reviewText, setReviewText] = useState(initialReview?.reviewText || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (initialReview) {
            setRating(initialReview.rating);
            setReviewText(initialReview.reviewText);
        } else {
            setRating(null);
            setReviewText('');
        }
    }, [initialReview]);

    if (!isLoaded) return null;
    if (!user) return (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Please sign in to leave a review.</p>
            </CardContent>
        </Card>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    targetId,
                    targetType,
                    rating,
                    reviewText
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to submit review");

            if (onReviewSubmitted) await onReviewSubmitted(data.review);
            toast.success("Review submitted!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!initialReview?._id) return;
        
        setIsDeleting(true);
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${initialReview._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to delete review");

            toast.success("Review deleted!");
            setRating(null);
            setReviewText('');
            if (onReviewDeleted) await onReviewDeleted();

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <img src={user.imageUrl} alt={user.fullName} className="w-10 h-10 rounded-full" />
                        <div>
                            <h4 className="font-semibold text-foreground">{user.fullName}</h4>
                        </div>
                    </div>
                    {initialReview && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    type="button"
                                    disabled={isDeleting}
                                    className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10 disabled:opacity-50"
                                    title="Delete review"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Review</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete your review? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                        onClick={handleDelete}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
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
                                    ? `${option.bg} text-white ring-2 ring-primary/20` 
                                    : `bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground`
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
                    className="w-full bg-background border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px]"
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Posting...' : (initialReview ? 'Update Review' : 'Post Review')}
                    </button>
                </div>
            </form>
            </CardContent>
        </Card>
    );
};

export default ReviewForm;
