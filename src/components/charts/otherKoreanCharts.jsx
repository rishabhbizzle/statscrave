import React from "react";
import { AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";

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
import { getKoreanChartData } from "@/actions/actions";

const OtherKoreanCharts = async ({ chartName }) => {
  let data = await getKoreanChartData(chartName);

  return (
    <div>
      {data?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[8%]">Rank</TableHead>
                <TableHead className="w-[10%]">#</TableHead>
                <TableHead className="w-[45%]">Title</TableHead>
                <TableHead className="w-[25%]">Artist</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((track, idx) => (
                <TableRow key={idx} className="">
                  <TableCell>
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
          OOPS!!! Something went wrong
        </div>
      )}
    </div>
  );
};

export default OtherKoreanCharts;
