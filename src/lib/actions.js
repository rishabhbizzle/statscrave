'use server'
import puppeteer from "puppeteer"
import Spotify from "@/helper/spotify";
import { connect } from "@/dgConfig/dbConfig";
import Artist from "@/models/artistModel";

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
    // const topTracks = await Spotify.artists.topTracks(id, "ES");
    const streamingData = await Artist.findOne({ spotifyId: id })
    return { artist, streamingData };
}


export const getArtistDiscography = async (artistId) => {
    const songsData = await getArtistSongsDailyData(artistId);
    const overallData = await getArtistOverallDailyData(artistId);
    const albumData = await getArtistAlbumsDailyData(artistId);
    return { songsData, overallData, albumData };
}