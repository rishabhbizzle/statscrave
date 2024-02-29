"use client";

import { themes } from "@/hooks/themes";
import { useConfig } from "@/hooks/use-config";
import { useTheme } from "next-themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis,  CartesianGrid, Tooltip, Legend } from "recharts";


export function BarChartComponent({ data, formatted }) {
  const formattedData = formatted ? data :  Object.keys(data).map((date) => ({
    date,
    streams: data[date],
}));
  const { theme: mode } = useTheme();
  const [config] = useConfig();
  const theme = themes.find((theme) => theme.name === config.theme)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={formattedData}
        style={{
          fill: "var(--theme-primary)",
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
        <Bar dataKey="streams" radius={[8, 8, 0, 0]}  />
      </BarChart>
    </ResponsiveContainer>
  );
}
