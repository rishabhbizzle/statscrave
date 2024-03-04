
import NewReleases from '@/components/dashboard/new-releases';
import { DataTable } from '@/components/data-table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getDashboardArtistRankingData, getUserFavourites } from '@/lib/actions';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Dashboard = async () => {
  const { artistFavourites, albumFavourites, trackFavourites } = await getUserFavourites();
  const artistsRanking  = await getDashboardArtistRankingData();
  return (
    <div className="container">
      <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button>Download</Button>
              </div>
            </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Artists</CardTitle>
          <CardDescription className="text-muted-foreground">
            The rankings is calculated based on current daily streams of your favourite artists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%]">#</TableHead>
                <TableHead className="w-[10%]"></TableHead>
                <TableHead className="w-[45%]" >Artist</TableHead>
                <TableHead >Total Streams</TableHead>
                <TableHead className="text-right">Daily Streams</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artistsRanking.map((artist, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Image
                      alt="cover"
                      className="object-cover"
                      height="50"
                      src={artist?.image}
                      width="50"
                    />
                  </TableCell>
                <Link href={`/artist/${artist.spotifyId}`} className="hover:underline" key={idx}>
                  <TableCell>{artist.name}</TableCell>
                </Link>
                  <TableCell>
                    {artist?.streams}
                  </TableCell>
                  <TableCell className="text-right">
                    {artist?.dailyStreams}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <Card>
          <CardHeader>
            <CardTitle>Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-56 md:h-72">

              {trackFavourites.map((track, i) => (
                <Item item={track} type="track" key={i} />
              ))}
              <ScrollBar />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* <Card >
          <CardHeader>
            <CardTitle>Artists</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-56 md:h-72">
              {artistFavourites.map((artist, i) => (
                <Item item={artist} type="artist" key={i} />
              ))}
              <ScrollBar />
            </ScrollArea>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Albums</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-56 md:h-72">
              {albumFavourites.map((album, i) => (
                <Item item={album} type="album" key={i} />
              ))}
              <ScrollBar />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
                <NewReleases />
    </div>
  )
}


const Item = ({ item, type, key }) => {
  return (
    <div className="flex items-center my-4" key={key}>
      <Avatar className="h-9 w-9">
        <AvatarImage src={item?.image} alt="Icon" />
        <AvatarFallback>N/A</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <Link href={`/${type}/${item?.spotifyId}`} passHref className="hover:underline">
          <p className="text-sm font-medium leading-none">{item?.name}</p>
        </Link>
      </div>
    </div>
  );
}


export default Dashboard
