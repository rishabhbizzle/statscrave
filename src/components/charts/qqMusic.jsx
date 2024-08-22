"use client";

import React from "react";
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
import axios from "axios";
import { toast } from "sonner";
import Loader from "../ui/loader";

const QQMusicChart = async () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/charts/qqMusic`
        );
        setData(res?.data?.data);
      } catch (error) {
        toast.error(error?.message);
        console.error(error);
      }
      setLoading(false);
    };

    fetchData()
  }, []);


  return (
    <div>
        <div className="my-3 mx-2">
            <p className="text-end text-sm text-gray-500">
                {data?.update ? `Updated at: ${data?.update}` : ''}
            </p>
        </div>

      {data?.list?.length > 0 && (
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
              {data?.list?.map((track, idx) => (
                <TableRow key={idx} className="">
                  <TableCell className="px-2 md:px-3">
                    <div className="flex gap-2 items-center">
                      <p>{track?.rank}</p>
                        {/* <p
                          className={`text-green-500`}
                        >
                          ({track?.rankValue} {track?.rankType})
                        </p> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <img
                      alt="cover"
                      className="object-cover"
                      height="50"
                      src={track?.cover ? track?.cover : track?.album ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${track?.album?.mid}.jpg` : '/logo-white.png'}
                      width="50"
                      loading="eager"
                    />
                  </TableCell>
                  <TableCell>{track?.name}</TableCell>
                  <TableCell>{track?.singerName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {loading && (<Loader />)}
    </div>
  );
};

export default QQMusicChart;
