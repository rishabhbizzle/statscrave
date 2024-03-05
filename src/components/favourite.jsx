"use client";

import { markFavourite } from "@/lib/actions";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

const FavouriteButton = ({ type, id, isFavourite, image, name }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        size="icon"
        disabled={loading}
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
