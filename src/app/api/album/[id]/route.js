import Spotify from "@/helper/spotify";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const albumDetails = await Spotify.albums.get(id, "ES")
        const albumTracks = await Spotify.albums.tracks(id, "ES", 50)
        // const relatedArtists = await Spotify.artists.relatedArtists(id);
        return NextResponse.json({
            success: true,
            data: {
                albumDetails,
                albumTracks,
            },
            message: "Album found successfully"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}