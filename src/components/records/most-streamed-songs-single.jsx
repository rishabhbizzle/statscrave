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

const MostStreamedSongsSingle = ({mode = 'day'}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || 'non-holiday';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchDayData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/others/mostStreamedSongsInSingleDay?type=${
          type ? type : ""
        }`
      );
      setData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  const fetchWeekData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/others/mostStreamedSongsInSingleWeek`
      );
      setData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (mode === 'day') fetchDayData();
    else fetchWeekData();
  }, [type]);

  return (
    <>
      <div className="flex justify-end my-2">
        {mode === 'day' && (
        <Select
          value={type? type : ''}
          onValueChange={(newVal) =>
            router.push(`?type=${newVal}`, {
              scroll: false,
            })
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select List Type" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem  value='holiday'>Holiday Songs</SelectItem>
                <SelectItem  value='non-holiday'>Non-Holiday Songs</SelectItem>
          </SelectContent>
        </Select>
        )}
      </div>
      {data?.length > 0 && (
        <DataTable
          data={data}
          type="track"
          searchColumn={"name"}
          title={"Most Streamed Songs"}
          description={
            "Following are the most streamed artists on Spotify for the selected year."
          }
        />
      )}
      {loading && <Loader />}
    </>
  );
};

export default MostStreamedSongsSingle;
