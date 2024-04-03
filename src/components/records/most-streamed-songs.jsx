"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "../data-table/data-table";
import Loader from "../ui/loader";
import { useRouter, useSearchParams } from "next/navigation";

const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const MostStreamedSongs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/others/mostStreamedSongs?year=${
          year ? year : ""
        }`
      );
      setData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  return (
    <>
      <div className="flex justify-end my-2">
        <Select
          value={year === "" ? year : parseInt(year)}
          onValueChange={(newVal) =>
            router.push(`?year=${newVal === "all-time" ? "" : newVal}`, {
              scroll: false,
            })
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all-time"}>All Time</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {data?.length > 0 && (
        <DataTable
          data={data}
          type="album2"
          searchColumn={"name"}
          title={"Most Streamed Songs"}
          description={
            "Following are the most streamed songs on Spotify for the selected year."
          }
        />
      )}
      {loading && <Loader />}
    </>
  );
};

export default MostStreamedSongs;
