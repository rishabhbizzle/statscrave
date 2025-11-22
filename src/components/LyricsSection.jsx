"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/ui/loader";
import { Mic2, AlertCircle, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const LyricsSection = ({
  trackName,
  artistName,
  albumName,
  duration,
  coverImage,
}) => {
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!trackName || !artistName || !duration) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://lrclib.net/api/get", {
          params: {
            track_name: trackName,
            artist_name: artistName,
            album_name: albumName,
          },
        });

        if (response?.data && response?.data?.plainLyrics) {
          setLyrics(response?.data?.plainLyrics);
        } else {
          setError("Lyrics not found");
        }
      } catch (err) {
        console.error("Error fetching lyrics:", err);
        setError("Lyrics not found");
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [trackName, artistName, albumName, duration]);

  if (loading) {
    return (
      <div className="w-full h-[500px] rounded-3xl bg-neutral-900/50 flex items-center justify-center backdrop-blur-sm border border-white/10">
        <Loader />
      </div>
    );
  }

  if (error) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 group">
      {/* Blurred Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${coverImage})`,
          filter: "blur(60px) brightness(0.4)",
          transform: "scale(1.2)",
        }}
      />
      
      {/* Gradient Overlay for better text contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 to-black/60" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-[600px] p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8 opacity-80">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
            <Mic2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">Lyrics</h2>
        </div>

        <ScrollArea className="flex-1 w-full pr-6 -mr-6">
          <div className="space-y-8 pb-20">
            {lyrics?.split("\n").map((line, index) => (
              <p
                key={index}
                className={cn(
                  "text-2xl md:text-3xl font-bold leading-tight transition-all duration-300 hover:text-white cursor-default",
                  line.trim() === "" ? "h-8" : "text-white/70"
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LyricsSection;
