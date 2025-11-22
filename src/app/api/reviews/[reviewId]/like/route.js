import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connect } from "@/dgConfig/dbConfig";
import Review from "@/models/reviewModel";

connect();

export async function POST(request, { params }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { reviewId } = params;

        const review = await Review.findById(reviewId);
        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const isLiked = review.likes.includes(userId);

        if (isLiked) {
            // Unlike
            review.likes = review.likes.filter(id => id !== userId);
        } else {
            // Like
            review.likes.push(userId);
        }

        await review.save();

        return NextResponse.json({
            success: true,
            likes: review.likes,
            isLiked: !isLiked
        });

    } catch (error) {
        console.error("Error toggling like:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
