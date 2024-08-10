import React from 'react'


export const metadata = {
    title: 'Spotify Replay | StatsCrave - Your ultimate music analytics platform',
    description: "Get your top tracks and artists from Spotify for last 1, 6 & 12 months. You can download a banner image of your top tracks and artists to share with your friends. Also get a roast on your music taste.",
    metadataBase: new URL('https://statscrave.com'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'de-DE': '/de-DE',
        },
    },
    openGraph: {
        images: [
            {
                url: 'https://statscrave.com/replayTwt.png',
                alt: 'StatsCrave - Your ultimate music analytics platform',
            },
            {
                url: 'https://statscrave.com/og-image2.jpg',
                alt: 'StatsCrave - Your ultimate music analytics platform',
            },
        ],
        type: 'website',
        locale: 'en_US',
        title: 'Spotify Replay | StatsCrave - Your ultimate music analytics platform',
        description: "Get your top tracks and artists from Spotify for last 1, 6 & 12 months. You can download a banner image of your top tracks and artists to share with your friends. Also get a roast on your music taste.",
        site_name: 'StatsCrave',
    },
    twitter: {
        card: "summary_large_image",
        title: 'Spotify Replay | StatsCrave - Your ultimate music analytics platform',
        description: "Get your top tracks and artists from Spotify for last 1, 6 & 12 months. You can download a banner image of your top tracks and artists to share with your friends. Also get a roast on your music taste.",
        url: 'https://statscrave.com',
        creator: "@StatsCrave",
        images: [
            {
                url: 'https://i.postimg.cc/4xqpV06N/replay-Twt.png',
                alt: 'StatsCrave - Your ultimate music analytics platform!!',
            },
        ],
    },
}



const Layout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout