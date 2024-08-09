import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaLastfmSquare, FaSpotify } from "react-icons/fa";
import WrappedImage from "./Wrapped";
import Roast from "./Roast";
import { timePeriodMap } from "@/lib/helperFunctions";

const UserData = ({
  type,
  setType,
  userData,
  timeRange,
  setTimeRange,
  platform,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* {platform === "spotify" && (
        <>
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
        </>
      )} */}
      <div className="flex justify-between w-full my-5 flex-col md:flex-row gap-3">
        {platform === "spotify" ? (
          <Tabs
            value={timeRange}
            className=""
            onValueChange={(newVal) => setTimeRange(newVal)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="short_term">Last 1 month</TabsTrigger>
              <TabsTrigger value="medium_term">Last 6 months</TabsTrigger>
              <TabsTrigger value="long_term">Last 1 year</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : (
          <div className="flex justify-between w-full my-5 flex-col md:flex-row gap-3 items-center">
            <Select
              value={timeRange}
              onValueChange={(newVal) => setTimeRange(newVal)}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7day">Last 7 days</SelectItem>
                <SelectItem value="1month">Last 1 month</SelectItem>
                <SelectItem value="3month">Last 3 months</SelectItem>
                <SelectItem value="6month">Last 6 months</SelectItem>
                <SelectItem value="12month">Last 1 year</SelectItem>
                <SelectItem value="overall">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {userData?.tracks?.length > 0 && userData?.artists?.length > 0 && (
          <div className="flex justify-center flex-col md:flex-row items-center gap-5">
            <WrappedImage
              data={userData}
              platform={platform}
              timePeriod={timeRange}
            />
            <Roast
              userData={userData}
              platform={platform}
              timePeriod={timePeriodMap[timeRange]}
            />
          </div>
        )}
      </div>

      {platform === "spotify" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Top Tracks</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 md:h-72">
                  {userData?.tracks?.map((item, i) => (
                    <Item
                      item={item}
                      type="track"
                      key={i}
                      platform={platform}
                    />
                  ))}

                  {userData?.tracks?.length === 0 && (
                    <div className="flex justify-center items-center h-36">
                      <p className="text-gray-500">
                        No data available for this time period
                      </p>
                    </div>
                  )}

                  <ScrollBar />
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Artists</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 md:h-72">
                  {userData?.artists?.map((item, i) => (
                    <Item
                      item={item}
                      type="artist"
                      key={i}
                      platform={platform}
                    />
                  ))}

                  {userData?.artists?.length === 0 && (
                    <div className="flex justify-center items-center h-36">
                      <p className="text-gray-500">
                        No data available for this time period
                      </p>
                    </div>
                  )}

                  <ScrollBar />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="w-full gap-5 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Top Albums</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-56 md:h-72">
                {userData?.albums?.map((item, i) => (
                  <Item item={item} type="artist" key={i} platform={platform} />
                ))}
                {userData?.albums?.length === 0 && (
                  <div className="flex justify-center items-center h-36">
                    <p className="text-gray-500">
                      No data available for this time period
                    </p>
                  </div>
                )}

                <ScrollBar />
              </ScrollArea>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Top Tracks</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-56 md:h-72">
                  {userData?.tracks?.map((item, i) => (
                    <Item
                      item={item}
                      type="track"
                      key={i}
                      platform={platform}
                    />
                  ))}

                  {userData?.tracks?.length === 0 && (
                    <div className="flex justify-center items-center h-36">
                      <p className="text-gray-500">
                        No data available for this time period
                      </p>
                    </div>
                  )}

                  <ScrollBar />
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Artists</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-56 md:h-72">
                  {userData?.artists?.map((item, i) => (
                    <Item
                      item={item}
                      type="artist"
                      key={i}
                      platform={platform}
                    />
                  ))}

                  {userData?.artists?.length === 0 && (
                    <div className="flex justify-center items-center h-36">
                      <p className="text-gray-500">
                        No data available for this time period
                      </p>
                    </div>
                  )}

                  <ScrollBar />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const Item = ({ item, type, key, platform }) => {
  return (
    <div className="flex items-center my-4" key={key}>
      <Link
        href={platform === "spotify" ? item?.external_urls?.spotify : item?.url}
        target="_blank"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={
              platform === "lastFm"
                ? item?.image[1]["#text"]
                : type === "artist"
                ? item?.images[0]?.url
                : item?.album?.images[0]?.url
            }
            alt="Icon"
          />
          <AvatarFallback>
            <FaLastfmSquare size={20} />
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex justify-between w-full">
        <div className="ml-4 space-y-1">
          <Link
            href={
              platform === "spotify" ? item?.external_urls?.spotify : item?.url
            }
            target="_blank"
          >
            <p className="text-sm font-medium leading-none">{item?.name}</p>
          </Link>
          <p className="text-sm text-gray-500">{item?.artist?.name}</p>
        </div>
        <div className="ml-4 space-y-1 items-center flex">
          {platform === "lastFm" ? (
            <p className="text-sm font-medium leading-none">
              {item?.playcount} plays
            </p>
          ) : (
            <Link
              className="text-sm font-medium leading-none"
              href={item?.external_urls?.spotify}
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

export default UserData;
