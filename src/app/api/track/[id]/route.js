import Spotify from "@/helper/spotify";
import { NextResponse } from "next/server";
import { connect } from "@/dgConfig/dbConfig";
import Song from "@/models/songModel";

export const GET = async (request, { params }) => {
    try {
        await connect();
        const { id } = params;
        const trackDetails = await Spotify.tracks.get(id, "ES");
        const trackFeatures = await Spotify.tracks.audioFeatures(id);
        // get the song from the database
        const streamingData = await Song.findOne({ spotifyId: id });

        return NextResponse.json({
            success: true,
            data: {
                trackDetails,
                trackFeatures,
                streamingData
            },
            message: "Track found successfully"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}