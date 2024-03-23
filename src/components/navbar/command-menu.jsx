"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CommandDialog, CommandInput } from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Loader from "../ui/loader";

export function CommandMenu({ ...props }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("artist");
  const [text, setText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(`/api/search?type=${type}&text=${text}`);
    const { data } = await res.json();
    if (res.status === 200) {
      if (type === "artist") {
        setResults(data?.results?.artists?.items || []);
      } else if (type === "album") {
        setResults(data?.results?.albums?.items || []);
      } else if (type === "track") {
        setResults(data?.results?.tracks?.items || []);
      }
    } else {
      console.error("Error fetching data");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const delay = 900;
    const debounce = setTimeout(() => {
      handleSearch();
    }, delay);
    return () => clearTimeout(debounce);
  }, [text]);

  React.useEffect(() => {
    handleSearch();
  }, [type]);

  React.useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (spotifyId) => {
    router.push(`/${type}/${spotifyId}`);
    setText("");
    setType("artist");
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        {loading && <Loader />}
        <CommandInput
          placeholder="Search..."
          onValueChange={(val) => setText(val)}
        />
        <div className="flex justify-end m-3">
          <Select value={type} onValueChange={(newVal) => setType(newVal)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="artist">
                <span>Artists</span>
              </SelectItem>
              <SelectItem value="album">
                <span>Albums</span>
              </SelectItem>
              <SelectItem value="track">
                <span>Songs</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-52 md:h-60">
          {results.map((result, i) => (
            <div className="px-3 my-1" key={i}>
              <div
                className="flex gap-2 border-b transition-colors hover:bg-muted/50 cursor-pointer"
                onClick={() => handleSelect(result?.id)}
              >
                <img
                  src={
                    type === "track"
                      ? result?.album?.images?.length > 0
                        ? result?.album?.images[0]?.url
                        : "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
                      : result?.images?.length > 0
                      ? result?.images[0]?.url
                      : "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
                  }
                  alt={result.name}
                  width={50}
                  height={50}
                />
                <span>{result.name}</span>
              </div>
            </div>
          ))}
          {results.length === 0 && !loading && (
            <div className="px-3 my-1">
              <div className="flex gap-2 justify-center">
                <span>No results found !!</span>
              </div>
            </div>
          )}
          <ScrollBar />
        </ScrollArea>
      </CommandDialog>
    </>
  );
}
