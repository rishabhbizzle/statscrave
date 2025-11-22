import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connect } from "@/dgConfig/dbConfig";
import Review from "@/models/reviewModel";

connect();

export async function GET(request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ review: null });
        }

        const { searchParams } = new URL(request.url);
        const targetId = searchParams.get('targetId');

        if (!targetId) {
            return NextResponse.json({ error: "Missing targetId" }, { status: 400 });
        }

        const review = await Review.findOne({ userId, targetId });

        return NextResponse.json({
            success: true,
            review
        });

    } catch (error) {
        console.error("Error fetching user review:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
