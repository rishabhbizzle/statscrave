"use client";

import React, { useState } from "react";
import { Share2, Download, Smartphone, Loader2 } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { entityHref } from "@/lib/streamsFormat";

const SITE = "https://statscrave.com";

// Share menu for a generated stats card (/card/[type]/[id]):
//  - "Share image": native share sheet with the PNG where supported (phones),
//    otherwise downloads it
//  - "Story size": the 9:16 version for TikTok / Instagram stories
//  - "Post on X": opens a prefilled post; the link unfurls as the same card
export default function ShareCardButton({ type, id, kind = "daily", text, name, pageId, size = "sm", variant = "outline", label = "Share" }) {
  const [busy, setBusy] = useState(false);
  const cardUrl = (format) => `/card/${type}/${id}?kind=${kind}${format === "story" ? "&format=story" : ""}`;
  const pageUrl = `${SITE}${entityHref(type, pageId || id)}`;
  const shareText = text || (name ? `${name} on StatsCrave` : "Streaming stats on StatsCrave");
  const fileName = `statscrave-${(name || type).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || type}-${kind}.png`;

  const shareImage = async (format) => {
    setBusy(true);
    try {
      const res = await fetch(cardUrl(format));
      if (!res.ok) throw new Error(res.status === 404 ? "No stats to share yet" : "Could not make the card");
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: "image/png" });
      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: `${shareText} ${pageUrl}` });
          return;
        } catch (error) {
          if (error?.name === "AbortError") return; // user closed the share sheet
        }
      }
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 10_000);
      toast.success("Card downloaded");
    } catch (error) {
      toast.error(error?.message || "Could not make the card");
    } finally {
      setBusy(false);
    }
  };

  const postOnX = () => {
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}&via=StatsCrave`;
    window.open(intent, "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={busy} aria-label={`${label}: ${name || type}`}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
          {label ? <span className="ml-2">{label}</span> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{kind === "milestone" ? "Milestone card" : "Daily stats card"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => shareImage("landscape")}>
          <Download className="mr-2 h-4 w-4" /> Share image
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => shareImage("story")}>
          <Smartphone className="mr-2 h-4 w-4" /> Story size (9:16)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={postOnX}>
          <FaXTwitter className="mr-2 h-4 w-4" /> Post on X
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
