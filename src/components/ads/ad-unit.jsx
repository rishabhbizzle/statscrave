"use client";

import { useEffect } from "react";

export default function AdUnit({ slot, client = "ca-pub-4120906202604776", format = "autorelaxed", responsive = true, style = "", ...props }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Ad error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      {...props}
    />
  );
}
