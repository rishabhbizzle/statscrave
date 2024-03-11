'use client'

import { Calendar, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import FavouriteButton from "./favourite";
import Link from "next/link";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";

export default function BasicDetails({ details, type, spotifyId }) {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const [isFavourite, setIsFavourite] = useState(false);
  const [reRender, setReRender] = useState(false);

  const fetchUserFavDetails = async () => {
    try {
      const userId = user?.id;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/isFavourite`,
        {
          type,
          spotifyId,
          id: userId,
        }
      );
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      setIsFavourite(res?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserFavDetails();
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row py-5 gap-8">
        <div className="w-full flex justify-center">
          <Image
            alt="cover"
            className="object-cover"
            height="250"
            src={
              type === "track"
                ? details?.album?.images[0]?.url
                : details?.images[0]?.url
            }
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
                {details?.followers?.total?.toLocaleString("en-US")} followers
              </span>
            </div>
          ) : (
            <div>
              <div>
                {details?.artists?.map((artist, i) => (
                  <Link
                    className="text-2xl font-bold hover:underline"
                    key={i}
                    href={`/artist/${artist.id}`}
                  >
                    {artist.name}
                    {i < details?.artists?.length - 1 ? ", " : ""}
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
              id={user?.id}
              spotifyId={details?.id}
              isFavourite={isFavourite}
              image={
                type === "track"
                  ? details?.album?.images[0]?.url
                  : details?.images[0]?.url
              }
              name={details?.name}
              setIsFavourite={setIsFavourite}
            />
            <Button variant="outline">Download PDF report</Button>
          </div>
        </div>
      </div>
    </>
  );
}
