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
  Brush,
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
            margin={{
              top: 5,
              right: 2,
              left: 6,
              bottom: 5,
            }}
            style={{
              fill: "#22C55E",
              opacity: 1,
              "--theme-primary": `hsl(${
                theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
              })`,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              labelStyle={{ color: mode === "dark" ? "#09090B" : "" }}
              className={mode === "dark" ? "text-[#09090B]" : "#FFFFFF"}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ lineHeight: "20px" }}
            />
            <Brush
              className="text-xs"
              fill={mode === "dark" ? "#09090B" : "#FFFFFF"}
              dataKey="date"
              height={25}
              stroke={mode !== "dark" ? "#09090B" : "#FFFFFF"}
            />
            <Bar dataKey="streams" radius={[6, 6, 0, 0]} />
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
