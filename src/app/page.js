
import NewReleases from '@/components/dashboard/new-releases';
import ArtistsSearch from '@/components/landing-page/ArtistsSearch';
import Features from '@/components/landing-page/features';
import HeroSection from '@/components/landing-page/hero-section';
import RecentUpdates from '@/components/landing-page/recent-updates';
import TopSongsGlobal from '@/components/landing-page/TopSongsGlobal';
import TopViralSongs from '@/components/landing-page/TopViralSongs';
import Recomendations from '@/components/recomendations';
import Container from '@/components/ui/container'
import Loader from '@/components/ui/loader';
import { InfiniteMovingCards } from '@/components/ui/moving-cards';
import { Suspense } from 'react';


const testimonials = [
  {
    quote:
      "I realy loved the this new site. It is way more practical and easy to use. You guys really snapped!",
    name: "Ariana Charts",
    title: "@chartsariana",
  },
  {
    quote:
      "God bless you for that amazing website of your. I am literally obsessed.",
    name: "Nicky",
    title: "@BIZZLEFOREIGN",
  },
  {
    quote: "You are doing great work.",
    name: "KAI",
    title: "@ended_everyone",
  },
  {
    quote: "Your website is super sick, it's honestly one of the best things someone did in the stan culture!",
    name: "Beanie",
    title: "@biebs_beanie",
  },
  {
    quote: "This just called me bland in all languages (about the Replay feature). Y'all need to check this out tooo!! Such a fun feature man!",
    name: "addy",
    title: "@rhodesjournal",
  },
  {
    quote: "Back online just to appreciate how good this website has turned out to be. Good going bro!",
    name: "ʎ",
    title: "@suxsfulrecovery",
  },
];


export default async function Home() {

  return (
    <Container>
      {/* <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center"> */}
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <main className="flex overflow-x-hidden relative flex-col items-center px-2 min-h-screen md:px-0 font-geistSans bg-hero-gradient">
        <div className="absolute top-0 -z-10 min-h-screen w-screen overflow-hidden bg-inherit  bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <HeroSection />

        <Suspense fallback={<Loader component={true} />}>
            <ArtistsSearch />
        </Suspense>


        <div className='flex gap-5 flex-col md:flex-row'>
          <TopSongsGlobal />
          <TopViralSongs />
        </div>
        <Features />
        {/* <div className='w-full'>
          <NewReleases />
        </div> */}
        <div className='mt-5 p-2'>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
        <Suspense fallback={<Loader component={true} />}>
          <RecentUpdates />
        </Suspense>
        {/* </div> */}


      </main>

    </Container>

  )
}
