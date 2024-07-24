'use client';

import Container from '@/components/ui/container'
import Loader from '@/components/ui/loader';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import UserData from '@/components/user-top-list/user-data';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { toast } from 'sonner';

const Page = () => {


    const [username, setUsername] = React.useState('')
    const [timePeriod, setTimePeriod] = React.useState('1month')
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            let artists = [];
            let tracks = [];
            let albums = [];

            // tracks
            const res = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&period=${timePeriod}&format=json`)


            // if this userName is wrong throw error and show toast and return

            if (res?.data?.error === 6) {
                toast.error(res?.data?.message || 'User not found')
                return
            }

            if (res?.data?.error) {
                toast.error(res?.data?.message || 'Failed to top tracks')
            }

            tracks = res?.data?.toptracks?.track

            // artists
            const res2 = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&period=${timePeriod}&format=json`)

            if (res2?.data?.error) {
                toast.error(res2?.data?.message || 'Failed to top artists')
            }

            artists = res2?.data?.topartists?.artist

            // albums

            const res3 = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&period=${timePeriod}&format=json`)
            if (res3?.data?.error) {
                toast.error(res3?.data?.message || 'Failed to top albums')
            }

            albums = res3?.data?.topalbums?.album

            setData({
                artists,
                tracks,
                albums
            })

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (username) {
            handleSubmit()
        }
    }, [timePeriod])



    return (
        <Container>
            <div className='my-8'>

            <h1 className='text-3xl md:text-4xl font-bold my-5'>LastFM Wrapped</h1>
            <p className='text-muted-foreground'>
            All you need to do is enter your last.fm username and select the time frame you want to generate the replay for. You can also download your replay as an image and share your music taste with the world!
            </p>
            </div>
            <div className='flex items-center flex-col justify-center h-full'>
                <p className='text-xl text-muted-foreground mt-4 mb-2'>
                    Enter your last.fm username:
                </p>
                <PlaceholdersAndVanishInput placeholders={['bizzxle', 'picklerick', 'umaruchan']} onChange={handleChange} onSubmit={handleSubmit} />
            </div>
            {data && (
                <UserData setTimeRange={setTimePeriod} timeRange={timePeriod} platform={'lastFm'} userData={data} />
            )}

            {loading && (<Loader />)}

        </Container>
    )
}

export default Page