"use client";
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

export default function RecentUpdates({ data }) {
  return (
    <div className="my-40 w-full flex justify-center px-10">
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
