"use client";

import React from "react";
import {
  Activity,
  Zap,
  Smile,
  Mic2,
  Music,
  Speaker,
  Clock,
  Info,
  BarChart2,
  TrendingUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/helperFunctions";

const featureConfig = {
  danceability: {
    label: "Danceability",
    description: "How suitable a track is for dancing.",
    icon: Activity,
    gradient: "from-blue-500 to-cyan-400",
  },
  energy: {
    label: "Energy",
    description: "Perceptual measure of intensity and activity.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-500",
  },
  valence: {
    label: "Mood",
    description: "Musical positiveness conveyed by a track.",
    icon: Smile,
    gradient: "from-green-400 to-emerald-600",
  },
  acousticness: {
    label: "Acousticness",
    description: "Confidence measure of whether the track is acoustic.",
    icon: Music,
    gradient: "from-amber-700 to-yellow-600",
  },
  instrumentalness: {
    label: "Instrumentalness",
    description: "Predicts whether a track contains no vocals.",
    icon: BarChart2,
    gradient: "from-slate-500 to-slate-300",
  },
  speechiness: {
    label: "Spoken Word",
    description: "Detects the presence of spoken words.",
    icon: Mic2,
    gradient: "from-purple-500 to-pink-500",
  },
  liveness: {
    label: "Liveness",
    description: "Detects the presence of an audience in the recording.",
    icon: Speaker,
    gradient: "from-red-500 to-rose-400",
  },
};



const AudioFeatures = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full space-y-8 py-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Track Analysis</h2>
          <p className="text-muted-foreground mt-1">
            Deep dive into the sonic characteristics.
          </p>
        </div>
        <div className="flex gap-4 text-sm font-medium text-muted-foreground bg-secondary/30 p-2 rounded-lg">
           <div className="flex items-center gap-2 px-2">
              <Clock className="w-4 h-4" />
              {formatDuration(data.duration_ms)}
           </div>
           <div className="w-px h-4 bg-border self-center" />
           <div className="flex items-center gap-2 px-2">
              <Activity className="w-4 h-4" />
              {Math.round(data.tempo)} BPM
           </div>
           <div className="w-px h-4 bg-border self-center" />
           <div className="flex items-center gap-2 px-2">
              <Music className="w-4 h-4" />
              Key: {data.key}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hero Card - Energy */}
        <BentoCard
          featureKey="energy"
          value={data.energy}
          config={featureConfig.energy}
          className="md:col-span-2"
          showGraph
        />
        
        {/* Danceability */}
        <BentoCard
          featureKey="danceability"
          value={data.danceability}
          config={featureConfig.danceability}
        />

        {/* Mood */}
        <BentoCard
          featureKey="valence"
          value={data.valence}
          config={featureConfig.valence}
        />

        {/* Acousticness */}
        <BentoCard
          featureKey="acousticness"
          value={data.acousticness}
          config={featureConfig.acousticness}
        />

        {/* Liveness & Speechiness Group */}
        <div className="grid grid-rows-2 gap-6">
           <BentoCard
            featureKey="liveness"
            value={data.liveness}
            config={featureConfig.liveness}
            compact
          />
           <BentoCard
            featureKey="speechiness"
            value={data.speechiness}
            config={featureConfig.speechiness}
            compact
          />
        </div>
      </div>
    </div>
  );
};

const BentoCard = ({ featureKey, value, config, className, showGraph, compact }) => {
  if (!config) return null;
  const percentage = Math.round(value * 100);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/20",
        className
      )}
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-2xl bg-secondary/50 group-hover:bg-secondary transition-colors">
            <Icon className={cn("w-6 h-6", compact ? "w-5 h-5" : "")} />
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground/40 hover:text-muted-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{config.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className={cn("font-bold tracking-tighter", compact ? "text-xl" : "text-3xl")}>
              {percentage}%
            </span>
            <span className="text-muted-foreground font-medium">{config.label}</span>
          </div>
          
          <div className="h-3 w-full bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r",
                config.gradient
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Background Gradient */}
      <div
        className={cn(
          "absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br",
          config.gradient
        )}
      />
    </div>
  );
};

export default AudioFeatures;
