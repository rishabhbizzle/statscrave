import { getDashboardArtistRankingData } from '@/lib/actions';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import Image from 'next/image';

const ArtistRankings = async () => {
  const artistsRanking = await getDashboardArtistRankingData();

  return (
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
  )
}

export default ArtistRankings