import { getMelonChartData } from "@/actions/actions";
import React, { Suspense } from "react";
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
import ChartTypeSelector from "../chartTypeSelector";
import { DatePicker } from "../ui/datePicker";

export default async function MelonCharts({ searchParams }) {
  const type = searchParams?.type || "realtime";
  const date = searchParams?.date || new Date();
  const data = await getMelonChartData(type, date);

  if (!data) {
    return (
      <div className="w-full flex justify-center m-10">
        **Internal Server Error!**
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-end my-2 gap-3 items-center">
        {["weekly", "monthly"].includes(type) && (
          <DatePicker otherParams={[{ key: "type", value: type }]} currentDate={date} />
        )}
        <ChartTypeSelector type={type} />
      </div>
      {data?.data?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%]">#</TableHead>
                <TableHead className="w-[45%]">Title</TableHead>
                <TableHead className="w-[25%]">Artist</TableHead>
                <TableHead className="w-[30%]">Album</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((track, idx) => (
                <TableRow key={idx} className="">
                  <TableCell>{track?.rank}</TableCell>
                  <TableCell>{track?.title}</TableCell>
                  <TableCell>{track?.artist}</TableCell>
                  <TableCell>{track?.album}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Pagination className="my-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/charts/lastFmTopTracks?page=${Number(page) - 1}`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`/charts/lastFmTopTracks?page=${page}`}
                  isActive
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`/charts/lastFmTopTracks?page=${Number(page) + 1}`}
                >
                  {Number(page) + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`/charts/lastFmTopTracks?page=${Number(page) + 1}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </>
      ) : (
        <div className="w-full flex justify-center m-10">
          OOPS!!! Chart not available for this country
        </div>
      )}
    </div>
  );
}
