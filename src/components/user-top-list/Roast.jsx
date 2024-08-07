import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BorderButton } from "../ui/moving-border";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ScrollArea } from "../ui/scroll-area";
import { Flame } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { formatDataForWrappedBanner } from "@/lib/helperFunctions";

const Roast = ({ userData: data, platform, timePeriod }) => {
  const [roastData, setRoastData] = useState(null);
  const [confirmRoast, setConfirmRoast] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = formatDataForWrappedBanner(data, platform);

  const getRoast = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/musicTasteRoast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData }),
      });
      const data = await response.json();
      setRoastData(data?.data?.roastData);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setConfirmRoast(false);
    setRoastData(null);
  }, [data]);

  return (
    <Dialog
    onInteractOutside={(e) => {
      e.preventDefault();
    }}
    >
      <DialogTrigger>
        <BorderButton
          borderRadius="1rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Roast Me!
        </BorderButton>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Your Music Taste Roast</DialogTitle>
          <DialogDescription>
            Our AI is a witty, sarcastic music critic with a vast knowledge of
            music history and pop culture. Are you ready to get roasted?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
            <Badge variant="secondary" >{platform}</Badge>
            <Badge variant="secondary">{timePeriod}</Badge>
          </div>
        <ScrollArea className="max-h-[400px]">

          {roastData && (
            <div>
              <TextGenerateEffect
                //   className="text-xl"
                filter={false}
                words={roastData}
              />
            </div>
          )}

          {loading && (
            <div className="space-y-2 mt-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton className="h-4 w-full" key={index} />
              ))}
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          )}

          
        </ScrollArea>
        <DialogFooter className="flex justify-between w-full">
        

        {!confirmRoast && (
            <Button
              onClick={getRoast}
              disabled={loading || roastData}
              className="w-full"
            >
              <Flame className="w-5 h-5 mr-2" />
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Roast;
