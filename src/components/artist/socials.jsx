"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FaSpotify,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLine,
  FaRadio,
  FaMusic,
} from "react-icons/fa";
import { SiPandora, SiGenius, SiShazam, SiDeezer  } from "react-icons/si";
import { IoIosRadio } from "react-icons/io";

const platformIcons = {
  Spotify: FaSpotify,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  YouTube: FaYoutube,
  Pandora: SiPandora,
  Shazam: SiShazam,
  LINE: FaLine,
  Genius: SiGenius,
  AirPlay: IoIosRadio,
  Deezer: SiDeezer,
};

const Icon = ({ platform }) => {
  const PlatformIcon = platformIcons[platform];
  if (!PlatformIcon) {
    return <FaMusic size={20} />;
  }
  return <PlatformIcon size={20} />;
};

const ArtistSocials = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [socialData, setSocialData] = useState([]);
  const fetchArtistSocialsData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/artist/social/${id}`
      );
      setSocialData(res?.data?.data || {});
    } catch (error) {
      toast.error(
        error?.message ||
          "An error occurred while fetching artist socials data."
      );
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtistSocialsData();
  }, [id]);

  return (
    <div className="w-full">
      {socialData?.socialSummary && (
        <Card className="my-4 md:my-8">
          <CardHeader>
            <CardTitle>Platforms Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-6xl mx-auto mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialData?.socialSummary?.map((item, index) => (
                  <Card key={index} className=" shadow-lg rounded-lg p-4">
                    <CardHeader>
                      <div className="flex items-center space-x-2 gap-1">
                        {item?.platform && <Icon platform={item?.platform} />}
                        <CardTitle>{item?.platform}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(item?.data).map(
                          ([key, value], index) => (
                            <div key={index}>
                              <div className="text-sm text-muted-foreground">{key}</div>
                              <div className="text-lg font-bold">{value}</div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {loading && <Loader component={true} text="Fetching Platforms Stats" />}
    </div>
  );
};

export default ArtistSocials;
