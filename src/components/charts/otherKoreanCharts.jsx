"use client";

import React, { useState, useEffect } from "react";
import { AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "../ui/loader";

const OtherKoreanCharts = ({ chartName }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartMap = {
    genie: '/genie/music/chart/200',
    naver: '/naver/music/chart/100',
    bugs: '/bugs/music/chart/100'
  }

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_KR_MUSIC_API_ENDPOINT}v1${chartMap[chartName]}`);
        setData(response?.data?.data || []);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch chart data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (chartName && chartMap[chartName]) {
      fetchChartData();
    }
  }, [chartName]);

  if (loading) {
    return (
      <Loader text="Loading chart data..." />
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center m-10">
        {error}
      </div>
    );
  }

  return (
    <div>
      {data?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[2%] px-2 md:px-3">Rank</TableHead>
                <TableHead className="w-[20%] md:w-[8%]">#</TableHead>
                <TableHead className="w-[45%]">Title</TableHead>
                <TableHead className="w-[25%]">Artist</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((track, idx) => (
                <TableRow key={idx} className="">
                  <TableCell className="px-2 md:px-3">
                    <div className="flex gap-2 items-center">
                      <p>{track?.rank}</p>
                      {["down", "up"].includes(track?.diff) ? (
                        <p
                          className={`text-${
                            track?.diff === "up" ? "green" : "red"
                          }-500`}
                        >
                          ({track?.diff === "up" ? "+" : "-"}{track?.diffVal})
                        </p>
                      ) : (
                        <p className="text-blue-500">(=)</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <img
                      alt="cover"
                      className="object-cover"
                      height="50"
                      src={track?.albumImg}
                      width="50"
                      loading="eager"
                    />
                  </TableCell>
                  <TableCell>{track?.name}</TableCell>
                  <TableCell>{track?.artist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="w-full flex justify-center m-10">
          No chart data available
        </div>
      )}
    </div>
  );
};

export default OtherKoreanCharts;
