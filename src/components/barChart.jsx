"use client";

import { themes } from "@/hooks/themes";
import { useConfig } from "@/hooks/use-config";
import { useTheme } from "next-themes";
import { useRef } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export function BarChartComponent({ data, formatted, artistName }) {
  const formattedData = formatted
    ? data
    : Object.keys(data).map((date) => ({
        date,
        streams: data[date],
      }));
  const { theme: mode } = useTheme();
  const [config] = useConfig();
  const theme = themes.find((theme) => theme.name === config.theme);
  const ref = useRef(null);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div>
      <div ref={ref}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={formattedData}
            style={{
              fill: "#22C55E",
              opacity: 1,
              "--theme-primary": `hsl(${
                theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
              })`,
            }}
          >
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              // tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <Bar dataKey="streams" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-end mt-3 items-end">
        <Button variant="secondary" onClick={downloadScreenshot}>
          <Download size={16} className="mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}
