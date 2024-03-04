'use server'
import puppeteer from "puppeteer"
import Spotify from "@/helper/spotify";
import { connect } from "@/dgConfig/dbConfig";
import Artist from "@/models/artistModel";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Album from "@/models/albumModel";
import { UserFavorite } from "@/models/userModel";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import Song from "@/models/songModel";

const browser = await puppeteer.launch({ headless: "new" });

export const getArtistSongsDailyData = async (artistId) => {
    console.log('fecthing songs data')
    const page = await browser.newPage();
    const url = `${process.env.DATA_SOURCE}spotify/artist/${artistId}_songs.html`;
    await page.goto(url);
    await page.waitForSelector('table');
    const songsData = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        if (tables.length >= 2) {
            const table = tables[1];
            const rows = Array.from(table.querySelectorAll('tr'));

            const columnIndexesToExtractLinks = [0];

            return rows.map(row => {
                const columns = Array.from(row.querySelectorAll('td'));
                let songTitle = columns[0] && columns[0].textContent ? columns[0].textContent?.startsWith('*') ? columns[0].textContent?.substring(1)?.trim() : columns[0].textContent?.trim() : null
                let link = columnIndexesToExtractLinks.includes(0) && columns[0] && columns[0].querySelector('a') ? columns[0].querySelector('a').getAttribute('href') : null
                let parts = link?.split('/');
                let id = parts && parts[parts.length - 1];
                const rowData = {
                    id: id,
                    title: songTitle,
                    link: link,
                    total: columns[1] && columns[1].textContent ? columns[1].textContent : null,
                    daily: columns[2] && columns[2].textContent ? columns[2].textContent : null
                };
                return rowData;
            });
        }
        return null;
    });
    return songsData;

}


export const getArtistAlbumsDailyData = async (artistId) => {
    // const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const url = `${process.env.DATA_SOURCE}spotify/artist/${artistId}_albums.html`;
    await page.goto(url);
    await page.waitForSelector('table');
    const albumData = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        if (tables.length >= 1) {
            const table = tables[0];
            const rows = Array.from(table.querySelectorAll('tr'));

            const columnIndexesToExtractLinks = [0];

            return rows.map(row => {
                const columns = Array.from(row.querySelectorAll('td'));
                let albumTitle = columns[0] && columns[0].textContent ? columns[0].textContent?.startsWith('^') ? columns[0].textContent?.substring(1)?.trim() : columns[0].textContent?.trim() : null
                let albumLink = columnIndexesToExtractLinks.includes(0) && columns[0] && columns[0].querySelector('a') ? columns[0].querySelector('a').getAttribute('href') : null
                let parts = albumLink?.split('/');
                let id = parts && parts[parts.length - 1];

                const rowData = {
                    id: id,
                    title: albumTitle,
                    link: albumLink,
                    total: columns[1] && columns[1].textContent ? columns[1].textContent : null,
                    daily: columns[2] && columns[2].textContent ? columns[2].textContent : null
                };


                return rowData;
            });
        }
        return null; // Return null if there's no second table
    });

    return albumData;
}


export const getArtistOverallDailyData = async (artistId) => {
    // const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const url = `${process.env.DATA_SOURCE}spotify/artist/${artistId}_songs.html`;
    await page.goto(url);
    await page.waitForSelector('table');
    const overallData = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        if (tables.length >= 2) {
            const table = tables[0]; // Select the second table
            const rows = Array.from(table.querySelectorAll('tr'));

            return rows.slice(1).map(row => {
                const columns = Array.from(row.querySelectorAll('td'));
                const rowData = {
                    type: columns[0] && columns[0].textContent ? columns[0].textContent : null,
                    total: columns[1] && columns[1].textContent ? columns[1].textContent : null,
                    lead: columns[2] && columns[2].textContent ? columns[2].textContent : null,
                    solo: columns[3] && columns[3].textContent ? columns[3].textContent : null,
                    feature: columns[4] && columns[4].textContent ? columns[4].textContent : null,
                };
                return rowData;
            });
        }
        return null;
    });
    return overallData;
}

export const getArtistSpotifyApiData = async (id) => {
    await connect();
    const artist = await Spotify.artists.get(id)
    return artist
}

export const getArtistMostPopularSongs = async (id) => {
    const topTracks = await Spotify.artists.topTracks(id, "US");
    return topTracks.tracks
}

export const getArtistStreamingData = async (id) => {
    const streamingData = await Artist.findOne({ spotifyId: id })
    return streamingData
}

export const getArtistDiscography = async (artistId) => {
    const songsData = await getArtistSongsDailyData(artistId);
    const overallData = await getArtistOverallDailyData(artistId);
    const albumData = await getArtistAlbumsDailyData(artistId);
    return { songsData, overallData, albumData };
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
        await connect();
        console.log('fetching album data:', id)
        const albumDetails = await Spotify.albums.get(id, "US")
        // const albumTracks = await Spotify.albums.tracks(id, "US", 50)
        let streamingData = await Album.findOne({ spotifyId: id })
        return { albumDetails, streamingData }
    } catch (error) {
        console.error(error);
        return { albumDetails: null, streamingData: null }
    }
}

export const getTrackData = async (id) => {
    try {
        await connect();
        console.log('fetching track data:', id)
        const trackDetails = await Spotify.tracks.get(id, "US")
        // const albumTracks = await Spotify.albums.tracks(id, "US", 50)
        let streamingData = await Song.findOne({ spotifyId: id })
        return { trackDetails, streamingData }
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
        if (userFavourite){
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
            return { message: "Removed from favourites" , type: "success"}
        } else {
            await UserFavorite.create({ kindeId: kindeId, type: type, spotifyId: spotifyId, image: image, name:name})
            revalidatePath(`/${type}/${spotifyId}`)
            return { message: "Added to favourites" , type: "success"}
        }

    }
    catch (error) {
        console.error(error);
        return { message: error.message || 'An error occured while marking favourite', type: "error"}
    }
}



export const getNewReleases = async () => {
    try {
        let newReleases = await Spotify.browse.getNewReleases("US", 10)
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
