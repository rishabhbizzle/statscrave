import React from 'react'


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id
  // fetch data
  const artistData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artist/${id}`, { cache: 'force-cache'}).then((res) => res.json())
  // optionally access and extend (rather than replace) parent metadata
  // og:image / twitter:image come from opengraph-image.js / twitter-image.js
  // (the live stats card), so no images are set here.
  return {
    title: `${artistData?.data?.name} | StatsCrave`,
    description: artistData.data?.summary,
    openGraph: {
      title: `${artistData?.data?.name} - Spotify Streams | StatsCrave`,
      description: artistData.data?.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${artistData?.data?.name} - Spotify Streams | StatsCrave`,
      url: 'https://statscrave.com',
      description: "A platform which offers comprehensive streaming statistics and personalized dashboard. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
      creator: "@StatsCrave",
    },
  }
}


const ArtistLayout = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ArtistLayout