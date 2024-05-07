import { getLastFmTopArtists } from "@/actions/actions";
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
import CountriesDropdown from "../countriesDropdown";
import { ExternalLink } from "lucide-react";

export default async function LastFmTopArtists({ searchParams }) {
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const country = searchParams?.country || null;
  const data = await getLastFmTopArtists(page, limit, country);

  if (!data) {
    return (
      <div className="w-full flex justify-center m-10">
        **Internal Server Error!**
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-end my-1">
        <CountriesDropdown country={country} />
      </div>

      {data?.artist?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%]">#</TableHead>
                <TableHead className="w-[50%]">Artist</TableHead>
                {!country && <TableHead className="w-[15%]">Streams</TableHead>}
                <TableHead className="w-[15%]">Listeners</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.artist?.map((track, idx) => (
                <TableRow key={idx} className="">
                  <TableCell>{page * 50 + idx + 1 - 50}</TableCell>
                  <TableCell>
                    <Link
                      className="hover:underline font-medium"
                      target="_blank"
                      href={track.url}
                    >
                      <div className="flex gap-1 items-center">
                        {track?.name}
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </Link>
                  </TableCell>
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
                  href={`/charts/lastFmTopArtists?page=${Number(page) - 1}`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`/charts/lastFmTopArtists?page=${page}`}
                  isActive
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`/charts/lastFmTopArtists?page=${Number(page) + 1}`}
                >
                  {Number(page) + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`/charts/lastFmTopArtists?page=${Number(page) + 1}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div className="w-full flex justify-center m-10">
          OOPS!!! Chart not available for this country
        </div>
      )}
    </div>
  );
}
