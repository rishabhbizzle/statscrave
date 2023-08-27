import Spotify from "@/helper/spotify";
import { NextResponse } from "next/server";
import { connect } from "@/dgConfig/dbConfig";
import Artist from "@/models/artistModel";

export const GET = async (request, { params }) => {
    try {
        await connect();
        const { id } = params;
        const artist = await Spotify.artists.get(id)
        const albums = await Spotify.artists.albums(id, "album", "ES", 30);
        const singles = await Spotify.artists.albums(id, "single", "ES", 20);
        const topTracks = await Spotify.artists.topTracks(id, "ES");
        // const relatedArtists = await Spotify.artists.relatedArtists(id);
        const streamingData = await Artist.findOne({ spotifyId: id })
        return NextResponse.json({
            success: true,
            data: {
                artist,
                albums,
                singles,
                topTracks,
                streamingData
                // relatedArtists
            },
            message: "Artist found successfully"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}