import { getAllCountries, getLastFmTopTracks } from "@/actions/actions";
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
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { countriesList } from "@/lib/helperFunctions";
import { redirect } from "next/navigation";
import CountriesDropdown from "../countriesDropdown";

export default async function LastFmTopTracks({ searchParams }) {
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const country = searchParams?.country || null;
  const data = await getLastFmTopTracks(page, limit, country);

  if (!data) {
    return <div>Internal Server Error</div>;
  }

  return (
    <div>
      <div className="w-full flex justify-end my-1">
      <CountriesDropdown country={country} />

      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]">#</TableHead>
            <TableHead className="w-[50%]">Title</TableHead>
            <TableHead className="w-[20%]">Artist</TableHead>
            {!country && <TableHead className="w-[15%]">Streams</TableHead>}
            <TableHead className="w-[15%]">Listeners</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.track?.map((track, idx) => (
            <TableRow key={idx} className="">
              <TableCell>{page * 50 + idx + 1 - 50}</TableCell>
              <TableCell>{track?.name}</TableCell>
              <TableCell>{track?.artist?.name}</TableCell>
              {!country && (
                <TableCell>
                  {parseInt(track?.playcount)?.toLocaleString("en-US")}
                </TableCell>
              )}
              <TableCell>
                {parseInt(track?.listeners)?.toLocaleString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="my-4">
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
      </Pagination>
    </div>
  );
}
