"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";
import { ScrollArea } from "../ui/scroll-area";

const ArtistRankings = ({ id }) => {
  const [artistsRanking, setArtistsRanking] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard/${id}`
      );
      if (res.status !== 200) {
        throw new Error(res?.data?.message || "Failed to fetch data");
      }
      setArtistsRanking(res?.data?.data);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [id]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Artists</CardTitle>
          <CardDescription className="text-muted-foreground">
            The rankings is calculated based on current daily streams of your
            favourite artists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!loading && artistsRanking && artistsRanking?.length === 0 && (
            <p className="text-muted-foreground text-center my-4">
              No artists found
            </p>
          )}
          {!loading ? (
            <ScrollArea className="h-60 md:h-80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[5%]">#</TableHead>
                    <TableHead className="w-[55%]">Artist</TableHead>
                    <TableHead>Total Streams</TableHead>
                    <TableHead className="text-right">Daily Streams</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artistsRanking &&
                    artistsRanking?.map((artist, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <Link href={`/artist/${artist.spotifyId}`} key={idx}>
                          <TableCell className="flex flex-col md:flex-row gap-3 items-center">
                            <Image
                              alt="cover"
                              className="md:object-cover"
                              height="55"
                              src={artist?.image}
                              width="55"
                            />
                            <p>{artist.name}</p>
                          </TableCell>
                        </Link>
                        <TableCell>{artist?.streams}</TableCell>
                        <TableCell className="text-right">
                          {artist?.dailyStreams}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <Loader component={true} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ArtistRankings;
