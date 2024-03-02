import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { getRecomendations } from "@/lib/actions";
import Link from "next/link";

export async function Recomendations({ type }) {
  const recomendations = await getRecomendations(type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check out these {type}s too:</CardTitle>
        {/* <CardDescription>kk</CardDescription> */}
      </CardHeader>
      <CardContent>
      <div className="w-full flex justify-center px-10 flex-col">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recomendations.map((data, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <Link href={`/${type}/${data?.spotifyId}`}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center flex-col p-0 hover:opacity-90 hover:scale-105  transition-all cursor-pointer">
                      <Image
                        src={data?.image}
                        alt="test"
                        width={500}
                        height={500}
                        className=" rounded-l object-"
                      />
                      <Button variant="none" className="w-full truncate">
                        {data?.title}
                      </Button>
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
      </CardContent>
    </Card>
  );
}
