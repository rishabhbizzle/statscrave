import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs";
import { connect } from "@/dgConfig/dbConfig";
import Review from "@/models/reviewModel";

connect();

export async function POST(request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const reqBody = await request.json();
        const { targetId, targetType, rating, reviewText } = reqBody;

        if (!targetId || !targetType || !rating) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upsert review: update if exists, insert if not
        const review = await Review.findOneAndUpdate(
            { userId, targetId },
            {
                userId,
                targetId,
                targetType,
                rating,
                reviewText,
            },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json({
            message: "Review submitted successfully",
            success: true,
            review,
        });

    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const targetId = searchParams.get('targetId');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 25;
        const sort = searchParams.get('sort') || 'newest'; // 'newest' | 'most_liked'

        if (!targetId) {
            return NextResponse.json({ error: "Missing targetId" }, { status: 400 });
        }

        // 1. Calculate Global Stats (Efficiently)
        const statsAggregation = await Review.aggregate([
            { $match: { targetId } },
            { $group: { _id: "$rating", count: { $sum: 1 } } }
        ]);

        const totalReviews = statsAggregation.reduce((acc, curr) => acc + curr.count, 0);

        const stats = {
            total: totalReviews,
            counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };

        statsAggregation.forEach(item => {
            if (stats.counts[item._id] !== undefined) {
                stats.counts[item._id] = item.count;
            }
        });

        // 2. Fetch Paginated Reviews
        const skip = (page - 1) * limit;

        let pipeline = [
            { $match: { targetId } },
            { $addFields: { likesCount: { $size: { $ifNull: ["$likes", []] } } } }
        ];

        if (sort === 'most_liked') {
            pipeline.push({ $sort: { likesCount: -1, createdAt: -1 } });
        } else {
            pipeline.push({ $sort: { createdAt: -1 } });
        }

        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });

        const reviews = await Review.aggregate(pipeline);

        // 3. Enrich with User Data
        const userIds = [...new Set(reviews.map(r => r.userId))];

        let usersMap = {};
        if (userIds.length > 0) {
            try {
                const users = await clerkClient.users.getUserList({
                    userId: userIds,
                    limit: 100,
                });

                users.forEach(user => {
                    usersMap[user.id] = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        imageUrl: user.imageUrl,
                        username: user.username
                    };
                });
            } catch (clerkError) {
                console.error("Error fetching users from Clerk:", clerkError);
            }
        }

        const enrichedReviews = reviews.map(review => ({
            ...review,
            user: usersMap[review.userId] || { firstName: 'Unknown', imageUrl: '' }
        }));

        return NextResponse.json({
            success: true,
            reviews: enrichedReviews,
            stats,
            pagination: {
                page,
                limit,
                hasMore: reviews.length === limit
            }
        });

    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
