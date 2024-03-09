import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";

const AlbumAndSongs = ( { id }) => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchFavouritesData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/favourites/${id}`
      );
      if (res.status !== 200) {
        throw new Error(res?.data?.message || "Failed to fetch data");
      }
      setData(res?.data?.data);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavouritesData();
  }, [id]);


  if (loading) {
    return <Loader component={true} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-56 md:h-72">
            {data?.trackFavourites?.map((track, i) => (
              <Item item={track} type="track" key={i} />
            ))}
            <ScrollBar />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Albums</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-56 md:h-72">
            {data?.albumFavourites?.map((album, i) => (
              <Item item={album} type="album" key={i} />
            ))}
            <ScrollBar />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

const Item = ({ item, type, key }) => {
  return (
    <div className="flex items-center my-4" key={key}>
      <Avatar className="h-9 w-9">
        <AvatarImage src={item?.image} alt="Icon" />
        <AvatarFallback>N/A</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <Link
          href={`/${type}/${item?.spotifyId}`}
          passHref
          className="hover:underline"
        >
          <p className="text-sm font-medium leading-none">{item?.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default AlbumAndSongs;
