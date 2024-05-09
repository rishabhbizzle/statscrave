"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useRouter } from "next/navigation";

export default function ChartTypeSelector({ type, redirectUrl }) {
  const router = useRouter();
  return (
    <Tabs
      className=""
      defaultValue="realtime"
      value={type}
      onValueChange={(newVal) =>
        router.push(`?type=${newVal}`, {
          scroll: false,
        })
      }
    >
      <TabsList>
        <TabsTrigger value="realtime">Realtime</TabsTrigger>
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
