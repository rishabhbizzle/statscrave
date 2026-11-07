'use server'

import { connect } from "@/dgConfig/dbConfig";
import Artist from "@/models/artistModel";
import Updates from "@/models/updatesModel";
import { currentUser } from '@clerk/nextjs';
import { isAdmin, requireAdmin } from "@/lib/auth";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import axios from "axios";
import Melon from "melon-chart-api";
import { revalidatePath, unstable_cache } from "next/cache";

export const getAllBlogsFromDb = async (count) => {
    try {
        await connect()
        const blogs = count ? await Updates.find({}).limit(count).sort({ createdAt: -1 }) : await Updates.find({}).sort({ createdAt: -1 })

        // convert the blogs to json
        const data = JSON.parse(JSON.stringify(blogs))
        return data


    } catch (error) {
        console.log(error)
        return null
    }
}

export const getBlogPostFromDb = async (slug) => {
    try {
        await connect()
        if (!slug) {
            return null
        }
        const blog = await Updates.findOne({ slug: slug })
        return blog
    } catch (error) {
        console.log(error)
        return null
    }
}


// For the /admin page's client-side redirect only; the real check is
// requireAdmin() inside each admin action.
export const isAdminAction = async () => isAdmin()

export const createBlogPostInDb = async (blog) => {
    try {
        requireAdmin()
        const user = await currentUser()

        // blog is of formdata type so get the values from it
        const title = String(blog.get('title') || '').trim()
        const content = sanitizeBlogHtml(String(blog.get('content') || ''))
        const image = String(blog.get('image') || '').trim()
        const status = blog.get('status') === 'published' ? 'published' : 'draft'
        const pin = blog.get('pin') === 'true'
        if (!title || title.length > 200) {
            return { data: null, error: 'Title is required (max 200 characters)' }
        }
        if (!content.trim()) {
            return { data: null, error: 'Content is required' }
        }
        if (image && !/^https?:\/\//i.test(image)) {
            return { data: null, error: 'Image must be an http(s) URL' }
        }
        await connect()
        const data = {
            title,
            content,
            image,
            status,
            pin,
            slug: title.replace(/\s+/g, '-').toLowerCase(),
            author: user?.firstName || 'Admin'
        }
        await Updates.create(data)
        revalidatePath('/admin')
        revalidatePath('/updates')
        return { data: 'Blog created', error: null }
    } catch (error) {
        return { data: null, error: error?.message || 'Failed to create blog' }
    }
}

export const getLastFmTopTracks = async (page = 1, limit = 10, country) => {
    try {
        const data = await axios.get(country ? `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&page=${page}` : `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&page=${page}`)
        return data?.data?.tracks
    } catch (error) {
        console.error(error);
        return null
    }
}

export const getLastFmTopArtists = async (page = 1, limit = 10, country) => {
    try {
        const data = await axios.get(country ? `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&page=${page}` : `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&page=${page}`)
        return country ? data?.data?.topartists : data?.data?.artists
    } catch (error) {
        console.error(error);
        return null
    }
}

export const getAllCountries = async () => {
    try {
        const data = await fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const countryNames = data.map((country) => country.name.common);
                return countryNames;
            })
        return data;
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getMelonChartData = async (chartType = 'realtime', date = new Date()) => {
    try {
        let data;
        if (chartType === 'monthly') {
            data = await Melon(date, { cutLine: 100 }).monthly().then(chartData => {
                return chartData
            })
        } else if (chartType === 'weekly') {
            data = await Melon(date, { cutLine: 100 }).weekly().then(chartData => {
                return chartData
            })
        } else if (chartType === 'daily') {
            data = await Melon(date, { cutLine: 100 }).daily().then(chartData => {
                return chartData
            })
        } else {
            data = await Melon(date, { cutLine: 100 }).realtime().then(chartData => {
                return chartData
            })
        }
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}




export const getTopArtistsForHomePage = async () => {
    return unstable_cache(
        async () => {
            try {
                console.log('Fetching top artists for homepage')
                const data = await Artist.find(
                    {}, 
                    'name _id image followers popularity genres totalStreams spotifyId'
                )
                .limit(5)
                .sort({ createdAt: 1 });
                return data;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
        ['top-artists-homepage'],
        {
            // / Cache for 6 hours
            revalidate: 21600,
            tags: ['top-artists']
        }
    )();
}