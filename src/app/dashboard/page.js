'use client'

import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import ArtistRankings from '@/components/dashboard/artistsRankings';
import AlbumAndSongs from '@/components/dashboard/albumAndSongs';
import dynamic from 'next/dynamic';

const NewReleases = dynamic(() => import('@/components/dashboard/new-releases'),{
  loading: () => <Loader component={true} />,
});


const Dashboard = async () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="container">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => console.log("test")}>Download</Button>
        </div>
      </div>
      {isLoading && <Loader />}
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
