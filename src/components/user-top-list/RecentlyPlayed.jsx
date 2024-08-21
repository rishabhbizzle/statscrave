import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { FaLastfmSquare, FaSpotify } from 'react-icons/fa'
import { formatDate } from '@/lib/helperFunctions'

function RecentlyPlayed({data, platform }) {
  if (!data) return null

  return (
        <div className="w-full gap-5 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Your Recently Played Tracks</CardTitle>
              <CardDescription>
              Your recently played tracks on {platform === "spotify" ? "Spotify" : "Last.fm"}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <ScrollArea className="h-56 md:h-96"> */}
                {data?.map((item, i) => (
                  <Item item={item} type="track" key={i} platform={platform} />
                ))}
                {data?.length === 0 && (
                  <div className="flex justify-center items-center h-36">
                    <p className="text-gray-500">
                      No tracks found. Play some music to see your recently played tracks.
                    </p>
                  </div>
                )}

                {/* <ScrollBar /> */}
              {/* </ScrollArea> */}
            </CardContent>
          </Card>
    </div>
  )
}

const Item = ({ item, type, key, platform }) => {
    return (
      <div className="w-full flex items-center my-4" key={key}>
        <Link
          href={platform === "spotify" ? item?.track?.external_urls?.spotify : item?.url}
          target="_blank"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={
                platform === "lastFm"
                  ? item?.image[1]["#text"]
                  : type === "artist"
                  ? item?.track?.images[0]?.url
                  : item?.track?.album?.images[0]?.url
              }
              alt="Icon"
            />
            <AvatarFallback>
              <FaLastfmSquare size={20} />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex justify-between w-full gap-1">
          <div className="w-[70%] ml-4 space-y-1">
            <Link
              href={
                platform === "spotify" ? item?.track?.external_urls?.spotify : item?.url
              }
              target="_blank"
            >
              <p className="text-sm font-medium leading-none">{platform === 'spotify' ? item?.track?.name : item?.name}</p>
            </Link>
            <p className="text-sm text-gray-500 text-ellipsis overflow-hidden">{platform === 'spotify' ? item?.track?.artists?.map((artist) => artist?.name).join(", ") : item?.artist['#text']}</p>
          </div>
          <div className="w-[30%] space-y-1 items-center flex gap-2 md:gap-5 md:justify-end flex-col md:flex-row">
            <div>
                <p className="text-xs md:text-sm text-gray-500">{platform === 'spotify' ? formatDate(item?.played_at) : item?.date['#text']}</p>
            </div>
            {platform === "spotify" && (
              <Link
                className="text-sm font-medium leading-none hidden md:flex"
                href={item?.track?.external_urls?.spotify}
                target="_blank"
              >
                <FaSpotify size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

export default RecentlyPlayed