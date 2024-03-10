'use client'


import React from 'react'
import { BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HoverEffect } from '@/components/ui/card-hover';

const RecordsPage = () => {
    return (
        <div>
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
];

export default RecordsPage