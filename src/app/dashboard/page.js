'use client'

import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import ArtistRankings from '@/components/dashboard/artistsRankings';
import AlbumAndSongs from '@/components/dashboard/albumAndSongs';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

const NewReleases = dynamic(() => import('@/components/dashboard/new-releases'), {
  loading: () => <Loader component={true} />,
});


const Dashboard = () => {
  const { isSignedIn: isAuthenticated, user, isLoaded } = useUser();

  return (
    <div className="container min-h-screen">
      <div className="flex items-center flex-col justify-between space-y-2 my-8">
        <div className='flex gap-2'>
          <Sparkles className='w-6 h-6' />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Dashboard</h2>
          <Sparkles className='w-6 h-6' />
        </div>
        <p className="text-muted-foreground text-center">
          Welcome to your dashboard. Here you can see your favourite artists, albums and songs.
        </p>
        <div className="flex items-center space-x-2">
          {/* <Button onClick={() => console.log("test")}>Download</Button> */}
        </div>
      </div>
      {!isLoaded && <Loader />}
      {user && (
        <div className='flex flex-col gap-8'>
          <ArtistRankings id={user?.id} />
          <AlbumAndSongs id={user?.id} />
          <NewReleases />
        </div>
      )}
    </div>
  )
}





export default Dashboard
