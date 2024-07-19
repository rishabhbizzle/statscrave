'use client';

import Container from '@/components/ui/container'
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

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmit = async (e) => {
        try {
            const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&period=${timePeriod}&format=json`)
            if (res?.data?.error) {
                toast.error(res?.data?.message || 'Failed to fetch data')
                return
            }
            setData(res?.data?.toptracks?.track)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (username){
            handleSubmit()
        }}, [timePeriod])



    return (
        <Container>
            <h1 className='text-5xl font-bold my-5'>LastFM Wrapped</h1>
            <div className='flex items-center flex-col justify-center h-full'>
                <p className='text-xl text-muted-foreground mt-4 mb-2'>
                    Enter your last.fm username:
                </p>
                <PlaceholdersAndVanishInput placeholders={['bizzxle', 'shubhazm', 'picklerick', 'umaruchan']} onChange={handleChange} onSubmit={handleSubmit} />
            </div>
            {data && (
            <UserData setTimeRange={setTimePeriod} platform={'lastFm'} userData={data} />
            )}

        </Container>
    )
}

export default Page