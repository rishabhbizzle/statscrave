import React from "react";
import { Volume2, Music, Clock, Play, BarChart2, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const featuresArray = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "loudness",
  "speechiness",
  "tempo",
  "valence",
  "duration_ms",
];

const AudioFeatures = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Features</CardTitle>
        <CardDescription>Audio features of the track</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {data && Object.keys(data).map((feature, index) => {
            if (featuresArray.includes(feature)) {
              return <FeatureCard feature={feature} value={data[feature]} key={index} />;
            }
            return null;
          })}
        </div>
        </CardContent>
    </Card>
  );
};

const FeatureCard = ({feature, value}) => {
    return (
      <Card key={feature}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {feature.toUpperCase()}
          </CardTitle>
          <Sparkles size={18} />
        </CardHeader>
        <CardContent>
          <span>{value}</span>
        </CardContent>
      </Card>
    );
  }

export default AudioFeatures;
