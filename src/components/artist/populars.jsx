import React from "react";
import { getArtistMostPopularSongs } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
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
import { millisecondsToMinutesSeconds } from "@/lib/helperFunctions";
import Link from "next/link";
const PopularTracks = async ({ id }) => {
  const tracks = await getArtistMostPopularSongs(id);
  return (
    <div className="md:px-10 my-5">
      <Card>
        <CardHeader>
          <CardTitle>Current Popular Tracks</CardTitle>
          <CardDescription className="text-muted-foreground">
            The rankings is calculated by algorithm and is based, in the most
            part, on the total number of plays the track has had and how recent
            those plays are. Generally speaking, songs that are being played a
            lot now will have a higher popularity than songs that were played a
            lot in the past.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%]">#</TableHead>
                <TableHead className="w-[20%]">Cover</TableHead>
                <TableHead className="w-[55%]">Title</TableHead>
                <TableHead className="w-[10%]">Duration</TableHead>
                <TableHead className="text-right">Popularity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.map((track, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Image
                      alt="cover"
                      className="object-cover"
                      height="50"
                      src={track.album.images[0].url}
                      width="50"
                    />
                  </TableCell>
                <Link href={`/track/${track.id}`} className="hover:underline" key={idx}>

                  <TableCell>{track.name}</TableCell>
                </Link>
                  <TableCell>
                    {millisecondsToMinutesSeconds(track.duration_ms)}
                  </TableCell>

                  <TableCell className="text-right">
                    {track.popularity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularTracks;
