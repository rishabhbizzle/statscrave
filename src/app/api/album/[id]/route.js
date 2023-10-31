import Spotify from "@/helper/spotify";
import { NextResponse } from "next/server";
import { connect } from "@/dgConfig/dbConfig";
import axios from "axios";
import Album from "@/models/albumModel";

export const GET = async (request, { params }) => {
    try {
        await connect();
        const { id } = params;
        console.log(id)
        const albumDetails = await Spotify.albums.get(id, "ES")
        // const albumTracks = await Spotify.albums.tracks(id, "ES", 50)
        let streamingData = await Album.findOne({ spotifyId: id })
        streamingData.dailyStreams = Object.keys(streamingData.dailyStreams).map((date) => ({
            date,
            streams: streamingData.dailyStreams[date],
        }));
        // external api call to get the current total streams of album tracks
        // axios.get(`https://api.t4ils.dev/albumPlayCount?albumid=${id}`)
        //     .then((response) => {
        //         streamingData.totalStreams = response.data.totalStreams;
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });



        return NextResponse.json({
            success: true,
            data: {
                albumDetails,
                streamingData
            },
            message: "Album found successfully"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}