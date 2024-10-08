"use client";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { bgOptions, formatDataForWrappedBanner, timePeriodMap } from "@/lib/helperFunctions";
import { Button } from "../ui/button";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Download, Share } from "lucide-react";
import { BorderButton } from "../ui/moving-border";


const WrappedImage = ({ data, platform, timePeriod }) => {
  const userData = formatDataForWrappedBanner(data, platform);
  const wrapperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState({
    color: "bg-gradient-to-r from-slate-900 to-slate-700",
    text: "white",
  });

  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  };

  const generateAndDownloadImage = async () => {
    setIsLoading(true);

    try {
      // Preload images
      const imagesToLoad = [userData.userImage];

      await Promise.all(
        imagesToLoad.map((url) =>
          preloadImage(url).catch((err) => {
            console.warn(err.message);
            return null; // Return null for failed images
          })
        )
      );

      const canvas = await html2canvas(wrapperRef.current, {
        width: 1080,
        height: 1920,
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true, // Allow cross-origin images to taint the canvas
        onclone: (clonedDoc) => {
          // Replace failed images with placeholders in the cloned document
          clonedDoc.querySelectorAll("img").forEach((img) => {
            if (!img.complete || img.naturalHeight === 0) {
              img.src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; // 1x1 transparent PNG
            }
          });
        },
      });

      // Convert canvas to blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      const filename = `${platform}-replay-statscrave.png`;

      // Check if the browser supports the download attribute
      const isDownloadSupported = "download" in document.createElement("a");

      if (isDownloadSupported) {
        // For most devices: use Blob and download attribute
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Fallback for iOS and other devices that don't support download
        const reader = new FileReader();
        reader.onload = function () {
          const fullScreen = window.open("", "_blank");
          if (fullScreen) {
            fullScreen.document.write(
              '<html><body style="margin:0;"><img src="' +
                reader.result +
                '" style="max-width:100%;max-height:100%;" /></body></html>'
            );
            fullScreen.document.title = filename;
            fullScreen.document.close();
          } else {
            // If popup is blocked, fallback to current window
            window.location.href = reader.result;
          }
        };
        reader.readAsDataURL(blob);
      }

      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(
        "There was an error generating your image. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength - 3) + "..";
  };

  return (
    <div>
      <div
        ref={wrapperRef}
        className={`w-[1080px] h-[1920px] ${background?.color} text-${background?.text} font-sans flex flex-col justify-center absolute left-[-9999px]`}
      >
        <div className="w-[48rem] h-[48rem] rounded-3xl overflow-hidden mx-auto mb-8 mt-8">
          <img
            src={userData.coverImg}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="py-8 px-12 flex flex-row gap-3 justify-between">
          {/* Top Artists */}
          <div className="w-1/2 pr-1 pl-3 ml-5">
            <h2 className="text-5xl font-normal mb-5">Top Artists</h2>
            <ol className="text-5xl font-bold mb-6">
              {userData?.topArtists?.map((artist, index) => (
                <li key={index} className=" my-3 h-full max-w-full">
                  {index + 1}.{" "}
                  {truncateText(
                    artist,
                    artist === artist?.toUpperCase() ? 11 : 15
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Top Songs */}
          <div className="w-1/2 pr-1 pl-3">
            <h2 className="text-5xl font-normal mb-5">Top Songs</h2>
            <ol className="text-5xl font-bold mb-6">
              {userData?.topSongs?.map((song, index) => (
                <li key={index} className="my-3 h-full  max-w-full">
                  {index + 1}.{" "}
                  {truncateText(
                    song?.name,
                    song?.name === song?.name?.toUpperCase() ? 11 : 16
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
        {platform === "lastFm" && (
          <div className="w-full px-10 flex justify-center mb-8 mt-4">
            <h2 className="text-3xl font-normal mr-3">Top Album: </h2>
            <p className="text-3xl font-bold mr-3">
              {truncateText(userData?.topAlbums[0]?.name, 22)}
            </p>
            <p className="text-3xl font-light">
              {" "}
              by {truncateText(userData?.topAlbums[0]?.artist, 16)} with{" "}
              <span className="font-semibold">
                {userData?.topAlbums[0]?.playcount}
              </span>{" "}
              plays
            </p>
          </div>
        )}

        <div className="flex w-full justify-between mt-5 px-16 ">
          <div className="flex justify-center items-center mt-10">
            {platform === 'lastFm' ? <FaLastfm className="w-10 h-10" /> : <FaSpotify className="w-10 h-10" />}
            <p className="text-xl font-medium italic ml-4">
              {timePeriodMap[timePeriod]}
            </p>
          </div>
          <div className="flex justify-end items-center  mt-10">
            {/* <img src="/logo-white.png" alt="Spotify" className="w-16" /> */}
            <p className="text-xl font-medium italic">STATSCRAVE.COM/REPLAY</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 md:gap-5 justify-center items-center">
        <Label>Color:</Label>
        <Select
          value={background}
          onValueChange={(newVal) => setBackground(newVal)}
        >
          <SelectTrigger className="w-[70px] md:w-[100px]">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            {bgOptions.map((bg, index) => (
              <SelectItem value={bg} key={index} className="w-full h-full">
                <div className={`${bg?.color} w-[50px] md:w-[80px] h-8`} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={generateAndDownloadImage}
          disabled={isLoading}
          size="sm"
        >
          <Share className="mr-2 h-5 w-5" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default WrappedImage;
