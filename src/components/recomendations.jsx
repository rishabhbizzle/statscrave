"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Loader from "./ui/loader";
import { toast } from "sonner";
import axios from "axios";

const Recomendations = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/others/getRecomendations?type=${type}`
      );
      if (res.status !== 200) {
        throw new Error(res?.data?.message || "Failed to fetch data");
      }
      setRecomendations(res?.data?.data);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check out these {type}s too:</CardTitle>
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
              {recomendations?.length > 0 &&
                recomendations.map((data, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/4 lg:basis-1/5"
                  >
                    <Link href={`/${type}/${data?.spotifyId}`}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square  justify-center flex-col p-4 hover:opacity-90 hover:scale-105  transition-all cursor-pointer">
                            <Image
                              src={data?.image}
                              alt="test"
                              width={500}
                              height={500}
                              className="rounded-l"
                            />
                            <div className="w-full flex">
                              <p className="truncate font-medium mt-1">
                                {data?.title}
                              </p>
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
      </CardContent>
      {loading && <Loader />}
    </Card>
  );
};

export default Recomendations;
