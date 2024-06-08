import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkle, Sparkles } from "lucide-react";

const UserData = ({ type, setType, userData, timeRange, setTimeRange }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full justify-between mt-12 mb-10">
        <div className="flex gap-3">
          <Sparkles size={32} />
          <h1 className="text-4xl font-bold">Your top {type}</h1>
        </div>
        <Select value={type} onValueChange={(newVal) => setType(newVal)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tracks">Tracks</SelectItem>
            <SelectItem value="artists">Artists</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs
        value={timeRange}
        className="w-full"
        onValueChange={(newVal) => setTimeRange(newVal)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="short_term">Last 4 weeks</TabsTrigger>
          <TabsTrigger value="medium_term">Last 6 months</TabsTrigger>
          <TabsTrigger value="long_term">Last 1 year</TabsTrigger>
        </TabsList>
      </Tabs>
      {userData?.length > 0 && (
        <Card className="w-full p-3 md:py-5 md:px-10 mt-5">
          {userData?.map((item, index) => (
            <Card key={index} className="w-full my-4 p-2 md:p-4">
              <div className="space-y-4 w-full flex items-center justify-between">
                <div className="flex items-center space-x-4">
                <p className="font-medium mr-2 md:mr-4">#{index + 1}</p>
                  <Link href={item?.external_urls?.spotify} target="_blank">
                    <Image
                      alt="Image"
                      className="h-16 w-16"
                      height="64"
                      src={
                        type === "artists"
                          ? item?.images?.length > 0
                            ? item?.images[0]?.url
                            : "/logo-white.png"
                          : item?.album?.images[0]?.url
                      }
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width="64"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={item?.external_urls?.spotify} target="_blank">
                      <p className="md:text-lg font-medium leading-6">
                        {item?.name}
                      </p>
                    </Link>
                    {type === "tracks" && (
                      <p className=" text-sm text-gray-500">
                        {item?.artists?.map((artist) => (
                          <Link
                            href={artist?.external_urls?.spotify}
                            target="_blank"
                            key={artist?.id}
                            className="hover:underline mr-1"
                          >
                            {artist?.name},
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center h-full mr-6">
                  <Link href={item?.external_urls?.spotify} target="_blank">
                    <img
                      alt="Image"
                      className="h-8 w-full"
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png"
                      }
                    />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
};

export default UserData;
