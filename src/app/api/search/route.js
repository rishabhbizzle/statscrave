import { NextResponse } from "next/server";
import Spotify from "@/helper/spotify";
export const fetchCache = 'force-no-store'


function getRandomCharacter() {
    try {
        const charCode = Math.floor(Math.random() * 26) + 97;
        return String.fromCharCode(charCode)
    } catch (error) {
        return null
    }
}

export const GET = async (request, { params }) => {
    try {
        const { searchParams } = new URL(request.url);

        const type = searchParams.get("type");
        const searchText = searchParams.get("text") || getRandomCharacter() || 'bieber'

        if (searchText === '') {
            return NextResponse.json({ error: "Please provide text" }, { status: 500 })
        }

        if (!type) {
            return NextResponse.json({ error: "Please provide type" }, { status: 500 })
        }

        const results = await Spotify.search(searchText, type, 'ES', 10);

        return NextResponse.json({
            success: true,
            data: {
                results
            },
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}