import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { WobbleCard } from "@/components/ui/wobble-card";
import Link from "next/link";

export default function ReplayPage({ }) {
  return (
    <Container >
      <Card >
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl">Replay</CardTitle>
          <CardDescription>
            Introducing Replay, where you can get your top artists, albums and songs for different time frames. Share your music taste with the world!
            Below is the list of platforms you can generate your replay from. More platforms will be added soon.
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto w-full p-5">
          <Link href={'/replay/lastFm'}>
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-red-700 min-h-[150px] lg:min-h-[200px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-3xl md:text-2xl lg:text-4xl font-semibold tracking-[-0.015em] text-white">
                  LastFM
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  Get your last.fm replay with your top artists and songs for different time frames.
                </p>
              </div>
              {/* <img
          src="https://cdn-icons-png.flaticon.com/512/226/226278.png"
          width={100}
          height={100}
          alt="linear demo image"
          className="absolute grayscale filter object-contain rounded-2xl"
          /> */}
            </WobbleCard>
          </Link>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-green-900 opacity-50">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Spotify
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200 opa">
              Get your Spotify replay with your top artists and songs for different time frames.
            </p>

            <p className="mt-3 text-end text-xl font-bold">
              Coming soon...
            </p>
          </WobbleCard>
        </div>
      </Card>
    </Container>

  );
}