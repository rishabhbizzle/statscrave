"use client";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const WrappedImage = ({ userData }) => {
  const wrapperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);

    try {
      // Preload images
      const imagesToLoad = [
        userData.userImage,
        ...userData.topSongs.map((song) => song.imageUrl),
      ];

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

      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "my-wrapped.png";
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      setError("There was an error generating your image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        ref={wrapperRef}
        className="w-[1080px] h-[1920px] bg-primary dark:bg-black font-sans flex flex-col "
      >
        <div className="relative w-full p-8 ">
          {/* Main user image */}
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <img
              src="https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36"
              alt="User"
              className="w-full h-full aspect-square object-cover rounded-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-row gap-2 justify-between">
          {/* Top Artists */}
          <div className="w-1/2">
            <h2 className="text-6xl font-bold mb-8 underline">Top Artists</h2>
            <ol className="text-4xl font-semibold mb-6">
              {userData.topArtists.map((artist, index) => (
                <li key={index} className=" my-2 text-ellipsis whitespace-nowrap h-full max-w-full">{artist}</li>
              ))}
            </ol>
          </div>

          {/* Top Songs */}
          <div>
            <h2 className="text-6xl font-bold mb-8 underline">Top Songs</h2>
            <ol className="text-4xl font-semibold mb-6">
              {userData.topSongs.map((song, index) => (
                <li key={index} className="my-2 text-ellipsis whitespace-nowrap h-full  max-w-full">{song.title}</li>
              ))}
            </ol>
          </div>

          {/* Minutes Listened and Top Genre */}
          {/* <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl mb-2">Minutes Listened</h2>
              <p className="text-4xl font-bold">{userData.minutesListened}</p>
            </div>
            <div>
              <h2 className="text-2xl mb-2">Top Genre</h2>
              <p className="text-4xl font-bold">{userData.topGenre}</p>
            </div>
          </div> */}
        </div>
        <div className="flex justify-end items-center px-10 mt-10">
        <img src="/logo-white.png" alt="Spotify" className="w-16" />
        <p className="text-xl font-medium italic">STATSCRAVE.COM/REPLAY</p>
        </div>
      </div>
      <button
        onClick={generateAndDownloadImage}
        disabled={isLoading}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {isLoading ? "Generating..." : "Download Your Wrapped Image"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default WrappedImage;
