import { getUserFavourites } from "@/lib/actions";
import React from "react";
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

const AlbumAndSongs = async () => {
  const { artistFavourites, albumFavourites, trackFavourites } =
    await getUserFavourites();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
