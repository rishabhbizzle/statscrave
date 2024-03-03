'use client';

import { markFavourite } from "@/lib/actions";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

const FavouriteButton = ({ type, id, isFavourite, image, name }) => {
  return (
    <>
      <Button size="icon" onClick={() => markFavourite(type, id, image, name)}>
        {isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
      </Button>
    </>
  );
};

export default FavouriteButton;
