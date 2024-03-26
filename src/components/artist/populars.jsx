'use client'


import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";

const PopularTracks = ({ id }) => {
  
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const fetchArtistMostPopularSongs = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/artist/popular/${id}`
      );
      setTracks(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtistMostPopularSongs(id);
  }, [id]);

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
          {loading && <Loader component={true} />}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%]">#</TableHead>
                <TableHead className="w-[20%]">Cover</TableHead>
                <TableHead className="w-[60%]">Title</TableHead>
                <TableHead className="w-[10%]">Duration</TableHead>
                <TableHead className="w-[5%] text-right">Popularity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.map((track, idx) => (
                <TableRow key={idx} className="">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <img
                      alt="cover"
                      className="object-cover"
                      height="50"
                      src={track.album.images[0].url}
                      width="50"
                    />
                  </TableCell>
                  <Link
                    href={`/track/${track.id}`}
                    className="hover:underline"
                    key={idx}
                  >
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
