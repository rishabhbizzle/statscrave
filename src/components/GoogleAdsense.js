"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GoogleAdsense = () => {
    const pathname = usePathname();
    const allowedPaths = ["/charts", "/records", "/updates", "/compare"];

    const shouldShowAds = allowedPaths.some((path) => pathname.startsWith(path));
    console.log("shouldShowAds", shouldShowAds)
    if (!shouldShowAds) {
        return null;
    }

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4120906202604776"
            crossorigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default GoogleAdsense;
