'use server'

import { connect } from "@/dgConfig/dbConfig";
import Artist from "@/models/artistModel";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Album from "@/models/albumModel";
import { UserFavorite } from "@/models/userModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import Song from "@/models/songModel";
import axios from "axios";


export const getArtistSongsDailyData = async (artistId) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/daily/songs/${artistId}`)
        const songsData = res?.data?.data || []
        return songsData;
    } catch (error) {
        console.error(error);
        return []
    }

}


export const getArtistAlbumsDailyData = async (artistId) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/daily/albums/${artistId}`)
        const albumData = res?.data?.data || []
        return albumData;
    } catch (error) {
        console.error(error);
        return []
    }
}


export const getArtistOverallDailyData = async (artistId) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/daily/overall/${artistId}`)
        const overallData = res?.data?.data || []
        return overallData;
    } catch (error) {
        console.error(error);
        return []
    }
}


export const getArtistSpotifyApiData = async (id) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/artist/${id}`)
        const artist = res?.data?.data || null
        return artist

    } catch (error) {
        console.error(error);
        return null
    }
}


export const getArtistMostPopularSongs = async (id) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/artist/popular/${id}`)
        return res?.data?.data || []
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getArtistStreamingData = async (id) => {
    try {
        await connect();
        const streamingData = await Artist.findOne({ spotifyId: id })
        return streamingData
    } catch (error) {
        console.error(error);
        return null
    }
}


export const getArtistRecords = async (name) => {
    try {
        let prompt = `Give 5 achievements of ${name}. Make sure the achievements are valid and legit. Your response should a single string in the format array contains objects with two keys title and details. The title is the name of the achievement and the details is the description of the achievement. For example: [{title: "Most streamed song", details: "The most streamed song by the artist is 'song name' with 100M streams"}]. Remember the string response should be in valid JSON format so that we can parse it without any errors.`
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const modelDetails = genAI.getGenerativeModel({ model: 'gemini-pro' })
        const result = await modelDetails?.generateContent(prompt);
        const text = result?.response?.text();
        console.log(text);
        let resultsObj = JSON.parse(text);
        return resultsObj;
    } catch (error) {
        console.error(error);
        return []
    }
}


export const getAlbumData = async (id) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/album/${id}`)
        return res?.data?.data || null
    } catch (error) {
        console.error(error);
        return { albumDetails: null, streamingData: null }
    }
}

export const getTrackData = async (id) => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/track/${id}`)
        console.log(res?.data)
        return res?.data?.data || null
    } catch (error) {
        console.error(error);
        return { trackDetails: null, streamingData: null }
    }
}


export const getRecomendations = async (type) => {
    try {
        await connect();
        let recomendations;
        if (type === "artist") {
            // get the random 10 artists from database
            recomendations = await Artist.aggregate([{ $sample: { size: 10 } }])
        } else if (type === "track") {
            // get the random 10 songs from database
            recomendations = await Song.aggregate([{ $sample: { size: 10 } }])
        } else if (type === "album") {
            // get the random 10 albums from database
            recomendations = await Album.aggregate([{ $sample: { size: 10 } }])
        }
        return recomendations
    } catch (error) {
        console.error(error);
        return []
    }
}


export const getUserFavourites = async () => {
    try {
        await connect();
        const { getUser } = await getKindeServerSession();
        let user = await getUser();
        let kindeId = user?.id
        let userFavourites = await UserFavorite.find({ kindeId: kindeId })
        // divide the favourites into types
        let artistFavourites = userFavourites.filter(fav => fav.type === "artist")
        let albumFavourites = userFavourites.filter(fav => fav.type === "album")
        let trackFavourites = userFavourites.filter(fav => fav.type === "track")
        return { artistFavourites, albumFavourites, trackFavourites }
    } catch (error) {
        console.error(error);
        return { artistFavourites: [], albumFavourites: [], trackFavourites: [] }
    }
}


export const isUserFavorite = async (type, spotifyId) => {
    try {
        await connect();
        const { getUser } = await getKindeServerSession();
        let user = await getUser();
        let kindeId = user?.id
        let userFavourite = await UserFavorite.findOne({ kindeId: kindeId, type: type, spotifyId: spotifyId })
        if (userFavourite) {
            return true
        }
        return false
    } catch (error) {
        console.error(error);
        return false
    }
}


export const markFavourite = async (type, spotifyId, image, name) => {
    try {
        if (!type || !spotifyId) throw new Error("Invalid type or id")
        const { getUser } = await getKindeServerSession();
        let user = await getUser();
        let kindeId = user?.id
        await connect();
        let userFavourite = await UserFavorite.findOne({ kindeId: kindeId, type: type, spotifyId: spotifyId })
        if (userFavourite) {
            await UserFavorite.deleteOne({ kindeId: kindeId, type: type, spotifyId: spotifyId })
            revalidatePath(`${type}/${spotifyId}`)
            return { message: "Removed from favourites", type: "success" }
        } else {
            await UserFavorite.create({ kindeId: kindeId, type: type, spotifyId: spotifyId, image: image, name: name })
            revalidatePath(`/${type}/${spotifyId}`)
            return { message: "Added to favourites", type: "success" }
        }

    }
    catch (error) {
        console.error(error);
        return { message: error.message || 'An error occured while marking favourite', type: "error" }
    }
}


export const getNewReleases = async () => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/v1/others/new-releases`)
        const newReleases = res?.data?.data || []
        return newReleases
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getDashboardArtistRankingData = async () => {
    try {
        let responseData = [];
        const { artistFavourites } = await getUserFavourites()
        for (let artist of artistFavourites) {
            const overAllData = await getArtistOverallDailyData(artist.spotifyId)
            // get the streams, daily obj from the overall data
            let streams = overAllData.find(data => data.type === "Streams")
            let daily = overAllData.find(data => data.type === "Daily")

            let artistData = {
                streams: streams?.total,
                dailyStreams: daily?.total,
                spotifyId: artist.spotifyId,
                image: artist.image,
                name: artist.name
            }

            responseData.push(artistData)
        }

        return responseData?.sort((a, b) => {
            const aNum = parseInt(a?.dailyStreams?.replace(/,/g, ''))
            const bNum = parseInt(b?.dailyStreams?.replace(/,/g, ''))
            return bNum - aNum
        }) || []

    } catch (error) {
        console.error(error);
        return []
    }
}
