'use client'


import React from 'react'
import { HoverEffect } from '@/components/ui/card-hover';

const RecordsPage = () => {
    return (
        <div className='min-h-screen'>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={projects} />
            </div>
        </div>
    )
}

const projects = [
    {
        title: "Most Streamed Artists",
        description: "A list of the most streamed artists on Spotify.",
        link: "/records/most-streamed-artists",
    },
    {
        title: "Most Streamed Albums",
        description: "A list of the most streamed albums on Spotify.",
        link: "/records/most-streamed-albums",
    },
    {
        title: "Most Streamed Songs",
        description: "A list of the most streamed songs on Spotify (year-wise list also available).",
        link: "/records/most-streamed-songs",
    },
    {
        title: "Most Popular Artists",
        description: "A list of the most popular artists on Spotify right now",
        link: "/records/most-popular-artists",
    },
    {
        title: "Most Streamed Songs in Single Day",
        description: "A list of the most streamed songs on Spotify in a single day.",
        link: "/records/most-streamed-songs-single-day",
    },
    {
        title: "Most Viewed Music Videos on YouTube",
        description: "A list of the most viewed music videos on YouTube. (all time and yearly)",
        link: "/records/most-viewed-music-videos",
    },
    // {
    //     title: "Most Streamed Songs in Single Week",
    //     description: "A list of the most streamed songs on Spotify in a single week.",
    //     link: "/records/most-streamed-songs-single-week",
    // },

];

export default RecordsPage