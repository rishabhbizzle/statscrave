
import Features from '@/components/landing-page/features';
import HeroSection from '@/components/landing-page/hero-section';
import RecentUpdates from '@/components/landing-page/recent-updates';
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
];


export default async function Home() {

  return (
    // <TracingBeam className="px-0">
    <Container>
      {/* <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center"> */}
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}

      <HeroSection />
      <div className='my-10 p-2'>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      <Features />
      <Suspense fallback={<Loader component={true} />}>
        <RecentUpdates />
      </Suspense>
      {/* </div> */}
    </Container>
    // </TracingBeam>

  )
}
