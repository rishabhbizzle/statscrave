import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function BasicDetails({ details, type = "artist"}) {
  return (
    <>
      <div className="relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 mb-14">
        <div className="overflow-hidden rounded-md flex justify-center">
          <Image
            src={details?.images[0]?.url}
            alt={details?.name}
            width={400}
            height={400}
            className={cn(
              "object-cover transition-all hover:scale-105 rounded-xl"
            )}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            {details?.name}
          </h1>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {details?.artists?.map((artist, i) => (
              <span className="" key={i}>
                {artist.name}
              </span>
            ))}
          </h2>
          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
              <tbody>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Popularity
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {details?.popularity}
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Release Date
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {details?.release_date}
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Total tracks
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {details?.total_tracks}
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Label
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {details?.label}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
