import React from "react";
import { CommandMenu } from "../navbar/command-menu";
import { getTopArtistsForHomePage } from "@/actions/actions";
import { Badge } from "../ui/badge";
import { toSentenceCase } from "@/lib/helperFunctions";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

const ArtistsSearch = async () => {
  const suggestions = await getTopArtistsForHomePage();

  return (
    <div className="w-full flex justify-center flex-col md:p-10 lg:px-28">
      <CommandMenu className="relative h-12 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12" />
      <div className="rounded-lg border shadow-md md:min-w-[600px] ">
        {suggestions.map((suggestion) => (
          <Link href={`/artist/${suggestion.spotifyId}`} key={suggestion._id}>
          
          <div className="w-full flex items-center gap-4 rounded-lg  p-4 transition-colors hover:bg-secondary">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
              <img
                src={suggestion?.image}
                alt="Album Cover"
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between flex-col md:flex-row">
                <h3 className="text-lg font-bold line-clamp-1">
                  {suggestion.name}
                </h3>
                <div className="hidden md:flex md:gap-2">
                  <Badge
                    variant="secondary"
                    className="text-[8px] md:text-xs truncate"
                  >
                    <FaSpotify className="inline-block mr-2" />
                    {suggestion.followers?.toLocaleString("en-US")} Followers
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-[8px] md:text-xs"
                  >
                    <FaSpotify className="inline-block mr-2" />
                    {suggestion.totalStreams?.toLocaleString("en-US")} Streams
                  </Badge>
                </div>
              </div>
              <div>
                {suggestion?.genres?.slice(0,2)?.map((genre) => (
                  <Badge
                    key={genre}
                    variant="outline"
                    className="mr-2 text-[9px] md:text-xs"
                  >
                    {toSentenceCase(genre)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistsSearch;
