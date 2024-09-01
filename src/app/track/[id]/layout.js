import React from 'react'


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id
  // fetch data
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/track/${id}?metaData=true`, { cache: 'force-cache'}).then((res) => res.json())
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${data?.data?.trackDetails?.name} by ${data?.data?.trackDetails?.artists[0]?.name || ''} - Spotify Streams | StatsCrave`,
    openGraph: {
      images: [
        { url: data.data?.trackDetails?.album?.images[0]?.url, alt: data.data?.trackDetails?.name },
        ],
      title: `${data?.data?.trackDetails?.name} by ${data?.data?.trackDetails?.artists[0]?.name || ''} - Spotify Streams | StatsCrave`,
      description: "A platform which offers comprehensive streaming statistics and personalized dashboard. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data?.data?.trackDetails?.name} by ${data?.data?.trackDetails?.artists[0]?.name || ''} - Spotify Streams | StatsCrave`,
      url: 'https://statscrave.com',
      description: "A platform which offers comprehensive streaming statistics and personalized dashboard. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
      creator: "@StatsCrave",
      images: [
        {
          url: data?.data?.trackDetails?.album?.images[0]?.url,
          alt: data?.data?.trackDetails?.name,
        },
        {
          url: 'https://i.postimg.cc/C10cs3Sf/og-image-wide.png',
          alt: 'StatsCrave - Your ultimate music analytics platform!!',
        },
      ],
    },
  }
}
  
const Layout = ({children}) => {
  return (
    <>
    {children}
    </>
  )
}

export default Layout