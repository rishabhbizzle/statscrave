import { NextResponse } from "next/server";
import { roastUserMusicTaste } from "@/actions/actions";
export const fetchCache = 'force-no-store'

export const POST = async (req) => {
    try {
        const { userData } = await req.json()

        if (!userData) {
            return NextResponse.json({ error: "Please provide User Data" }, { status: 500 })
        }

        const roastData = await roastUserMusicTaste(userData)

        return NextResponse.json({
            success: true,
            data: {
                roastData
            }
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}