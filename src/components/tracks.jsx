"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


function millisecondsToMinutesSeconds(duration_ms) {
    let seconds = Math.floor(duration_ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
  
    // Format the result as minutes:seconds
    let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return formattedDuration;
  }

export function TracksSection({ tracks, defaultImage }) {
  return (
    <div className="space-y-8 overflow-y-auto h-96 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
    {tracks.map((track, i) => (
      <div className="flex items-center" key={i}>
        <Avatar className="h-9 w-9">
          <AvatarImage src={defaultImage} alt="Icon" />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <Link href={`/track/${track?.id}`} passHref>
          <p className="text-sm font-medium leading-none">{track?.name}</p>
          </Link>
          <p className="text-sm text-muted-foreground">
          {track.artists?.map((artist, i) => (
                <span className='mr-1' key={i}>{artist.name}</span>
              ))}
          </p>
        </div>
        <div className="ml-auto font-medium">{millisecondsToMinutesSeconds(track?.duration_ms)}</div>
      </div>
    ))}
    </div>
  );
}
