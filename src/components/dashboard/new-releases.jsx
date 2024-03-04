import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getNewReleases } from "@/lib/actions";
import { Badge } from "../ui/badge";
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
import Link from "next/link";

const NewReleases = async () => {
  const {
    albums: { items },
  } = await getNewReleases();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>This weeks new releases:</CardTitle>
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
                {items.map((data, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/4 lg:basis-1/5"
                  >
                    <Link href={data?.external_urls?.spotify} target="_blank">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square  justify-center flex-col p-4 hover:opacity-90 hover:scale-105  transition-all cursor-pointer">
                            <Image
                              src={data?.images[0].url}
                              alt="test"
                              width={500}
                              height={500}
                              className="rounded-l"
                            />
                            <div className="w-full flex">
                              <p className="truncate font-medium">
                                {data?.name}
                              </p>
                            </div>
                            <div className="flex w-full">
                              <p className="truncate">
                                {data?.artists
                                  ?.map((artist) => artist.name)
                                  .join(", ")}
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
      </Card>

      {/* <BentoGrid className="mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item?.name}
            description={
                item?.artists?.map((artist) => artist.name).join(", ")
            }
            header={
                <img
                  src={item.images[0].url}
                  alt={item.name}
                className="object-cover flex flex-1 w-full h-full min-h-[6rem] rounded-xl "
                  />
            }
            className={item.className}
            icon={
                <Badge>
                    {item?.album_type}
                </Badge>
            }
          />
        ))}
      </BentoGrid>
    */}
    </div>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default NewReleases;
