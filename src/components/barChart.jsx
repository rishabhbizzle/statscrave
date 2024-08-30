"use client";

import { themes } from "@/hooks/themes";
import { useConfig } from "@/hooks/use-config";
import { useTheme } from "next-themes";
import { useRef, useMemo } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
} from "recharts";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export function BarChartComponent({ data, formatted, artistName }) {
  const formattedData = useMemo(() => 
    formatted
      ? data
      : Object.keys(data).map((date) => ({
          date,
          streams: data[date],
        })),
    [data, formatted]
  );

  // Sort data by date in ascending order
  const sortedData = useMemo(() => 
    [...formattedData].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [formattedData]
  );

  // Determine the default view range (last 30 days or all data if less than 30 days)
  const defaultViewRange = useMemo(() => {
    const dataLength = sortedData.length;
    if (dataLength <= 100) {
      return [0, dataLength - 1];
    } else {
      return [dataLength - 100, dataLength - 1];
    }
  }, [sortedData]);

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
          <AreaChart
            data={sortedData}
            margin={{
              top: 5,
              right: 2,
              left: 6,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={10}
              tickLine={true}
              axisLine={true}
            />
            <YAxis
              stroke="#888888"
              fontSize={10}
              tickLine={true}
              axisLine={true}
            />
            <Tooltip
              labelStyle={{ color: mode === "dark" ? "#09090B" : "" }}
              className={mode === "dark" ? "text-[#09090B]" : "#FFFFFF"}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ lineHeight: "20px" }}
              formatter={(value, entry, index) => (
                <span style={{ color: "#22C55E" }}>{value}</span>
              )}
            />
            <Brush
              className="text-[8px]"
              dataKey="date"
              height={25}
              fill={mode === "dark" ? "#09090B" : "#FFFFFF"}
              stroke={mode !== "dark" ? "#09090B" : "#FFFFFF"}
              fillOpacity={0.5}
              strokeOpacity={0.5}
              startIndex={defaultViewRange[0]}
              endIndex={defaultViewRange[1]}
            />
            <Area
              type="monotone"
              dataKey="streams"
              fillOpacity={0.5}
              fill="#22C55E"
              stroke="#22C55E"
              dot={{ fill: "#22C55E", stroke: "#22C55E" }}
            />
          </AreaChart>
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