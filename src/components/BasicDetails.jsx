import { Calendar, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import FavouriteButton from "./favourite";
import Link from "next/link";

export default function BasicDetails({ details, type, isFavourite }) {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row py-5 gap-8">
        <div className="w-full flex justify-center">
        <Image
          alt="cover"
          className="object-cover"
          height="250"
          src={type === "track" ? details?.album?.images[0]?.url : details?.images[0]?.url}
          width="250"
          />
          </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <h1 className="text-4xl font-bold">{details?.name}</h1>
            <div className="text-2xl p-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              {details?.popularity}
            </div>
          </div>

          {type === "artist" ? (
              <div>
                <Users className="inline-block mr-1" size={24} />
                <span className="text-sm">
                  {details?.followers.total} followers
                </span>
              </div>
          ) : (
            <div>
              <div>
                {details?.artists?.map((artist, i) => (
                  <Link className="text-2xl font-bold hover:underline" key={i} href={`/artist/${artist.id}`}>
                    {artist.name}{i < details?.artists?.length - 1 ? ", " : ""}
                  </Link>
                ))}
              </div>
              {details?.release_date && (
              <div className="flex gap-1">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{details?.release_date}</span>
              </div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-1 text-2xl font-bold items-center">
            {details?.genres?.map((genre, index) => {
              return <Badge key={index}>{genre}</Badge>;
            })}
          </div>

          <div className="mt-4 flex space-x-3">
            <FavouriteButton
              type={type}
              id={details?.id}
              isFavourite={isFavourite}
              image={type === "track" ? details?.album?.images[0]?.url : details?.images[0]?.url}
              name={details?.name}
            />
            <Button variant="outline">Download PDF report</Button>
          </div>
        </div>
      </div>
    </>
  );
}
