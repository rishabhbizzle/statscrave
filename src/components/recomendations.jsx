import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";

export function Recomendations({ type, setLoading }) {
  const [recomendations, setRecomendations] = useState([]);
  const fetchRecomendations = async () => {
    try {
      await axios
        .get(`/api/recomendations?type=${type}`)
        .then((res) => {
          setRecomendations(res?.data?.data?.recomendations);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecomendations();
  }, []);

  return (
    <div className="w-full flex justify-center px-10 flex-col">
        <p className="text-2xl font-bold mb-5">Check out these {type}s too:</p>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center flex-col p-0 hover:opacity-90 hover:scale-105  transition-all cursor-pointer">
                    <Image
                      src="https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de"
                      alt="test"
                      width={500}
                      height={500}
                      className=" rounded-l object-"
                    />
                    <Button variant="none" className="w-full text-ellipsis overflow-hidden">Purpose</Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
