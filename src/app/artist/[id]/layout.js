import React from 'react'


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id
  // fetch data
  const artistData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artist/${id}`, { cache: 'force-cache'}).then((res) => res.json())
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${artistData?.data?.name} | StatsCrave`,
    description: artistData.data?.summary,
    openGraph: {
      images: [
        { url: artistData.data?.images[0]?.url, alt: artistData.data?.name },
        ],
      title: `${artistData?.data?.name} | StatsCrave`,
      description: artistData.data?.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${artistData?.data?.name} | StatsCrave`,
      url: 'https://statscrave.com',
      description: "A platform which offers comprehensive streaming statistics and personalized dashboard. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
      creator: "@StatsCrave",
      images: [
        {
          url: artistData.data?.images[0]?.url,
          alt: artistData.data?.name,
        },
        {
          url: 'https://i.postimg.cc/C10cs3Sf/og-image-wide.png',
          alt: 'StatsCrave - Your ultimate music analytics platform!!',
        },
      ],
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