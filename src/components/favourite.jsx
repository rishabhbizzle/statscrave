"use client";

import { markFavourite } from "@/lib/actions";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

const FavouriteButton = ({ type, id, isFavourite, image, name }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        size="icon"
        onClick={async () => {
          setLoading(true);
          await markFavourite(type, id, image, name);
          setLoading(false);
        }}
      >
        {isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
      </Button>
    </>
  );
};

export default FavouriteButton;
