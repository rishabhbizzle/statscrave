
import NewReleases from '@/components/dashboard/new-releases';
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import ArtistRankings from '@/components/dashboard/artistsRankings';
import AlbumAndSongs from '@/components/dashboard/albumAndSongs';
export const maxDuration = 300


const Dashboard = async () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
      <div className='flex flex-col gap-8'>

        <ArtistRankings />
        <AlbumAndSongs />
        <NewReleases />
      </div>
    </div>
  )
}





export default Dashboard
