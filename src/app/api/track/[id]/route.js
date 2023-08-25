import Spotify from "@/helper/spotify";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const trackDetails = await Spotify.tracks.get(id, "ES");
        const trackFeatures = await Spotify.tracks.audioFeatures(id);
        return NextResponse.json({
            success: true,
            data: {
                trackDetails,
                trackFeatures,
            },
            message: "Track found successfully"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}