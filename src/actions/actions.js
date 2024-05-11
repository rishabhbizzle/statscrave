'use server'

import { connect } from "@/dgConfig/dbConfig";
import Updates from "@/models/updatesModel";
import { currentUser } from '@clerk/nextjs';
import axios from "axios";
import Melon from "melon-chart-api";
import { revalidatePath } from "next/cache";

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


export const createBlogPostInDb = async (blog) => {
    try {
        const user = await currentUser();
        console.log(user, user?.firstName, user?.id)
        if (!user) {
            return { data: null, error: 'User not found' }
        }

        // blog is of formdata type so get the values from it
        const title = blog.get('title')
        const content = blog.get('content')
        const image = blog.get('image')
        const status = blog.get('status') || 'draft'
        const pin = blog.get('pin') || false
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
        const newBlog = Updates.create(data)
        revalidatePath('/admin')
        return { data: 'Blog created', error: null }
    } catch (error) {
        return { data: null, error: error?.message }
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

export const getKoreanChartData = async (chartName) => {
    const chartMap = {
        genie : '/genie/music/chart/200',
        naver : '/naver/music/chart/100',
        bugs: '/bugs/music/chart/100'
    }
    try {
        const data = await fetch(`http://kr-music.ap-south-1.elasticbeanstalk.com/v1${chartMap[chartName]}`)
            .then((response) => response.json())
            .then((data) => {
                return data?.data
            })
        return data;
    } catch (error) {
        console.error(error)
        return []
    }
}