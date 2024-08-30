import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { getAllBlogsFromDb } from "@/actions/actions";

export default async function RecentUpdates() {
  const data = await getAllBlogsFromDb(5)

  return (
    <div className="mt-14 mb-24 w-full flex justify-center px-10">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {data?.length > 0 &&
            data?.map((data, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/updates/${data?.slug}`}>
                  <div className="p-1 min-h-full w-full">
                    <Card className="min-h-full">
                      <CardContent className="h-[22rem] flex items-center justify-center flex-col p-4 hover:opacity-90 hover:scale-105  transition-all cursor-pointer">
                        <img
                          alt="Cover image"
                          loading="lazy"
                          className="aspect-video overflow-hidden rounded-lg object-cover w-full h-full"
                          src={data.image}
                        />
                        <div className="w-full text-sm h-[30%] flex mt-3">
                          <p className="font-medium">{data?.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
