import { NextResponse } from "next/server";
import { connect } from "@/dgConfig/dbConfig";
import Artist from "@/models/artistModel";
import Song from "@/models/songModel";
import Album from "@/models/albumModel";

export const GET = async (request, { params}) => {
    try {
        await connect();
        const {searchParams} = new URL(request.url);
        const type = searchParams.get("type");
        let recomendations;
        if (type === "artist") {
            // get the random 10 artists from database
            recomendations = await Artist.aggregate([{ $sample: { size: 10 } }])
        }else if (type === "track") {
            // get the random 10 songs from database
            recomendations = await Song.aggregate([{ $sample: { size: 10 } }])
        } else if (type === "album") {
            // get the random 10 albums from database
            recomendations = await Album.aggregate([{ $sample: { size: 10 } }])
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 })
        }

        
        return NextResponse.json({
            success: true,
            data: {
                recomendations
            },
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}