import Container from "@/components/ui/container";
import { WobbleCard } from "@/components/ui/wobble-card";
import WrappedImage from "@/components/user-top-list/Wrapped";
import Link from "next/link";

export default function WrappedPage() {
  const userData = {
    userImage: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSqoSEuV0lmNrEVLwJ6q75DaOWQjorN0b2G_BLJr4OScCX0YSZ',
    topArtists: ['Taylor Swift', 'Noah Kahan', 'Maisie Peters', 'The Band CAMINO', 'Daisy Jones & The Six'],
    topSongs: [
      { title: 'Let Me Down Slowly', imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSqoSEuV0lmNrEVLwJ6q75DaOWQjorN0b2G_BLJr4OScCX0YSZ' },
      { title: 'The River', imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSqoSEuV0lmNrEVLwJ6q75DaOWQjorN0b2G_BLJr4OScCX0YSZ' },
      { title: 'The View Between Villages', imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSqoSEuV0lmNrEVLwJ6q75DaOWQjorN0b2G_BLJr4OScCX0YSZ' },
      { title: 'Regret Me', imageUrl: 'https://example.com/song4.jpg' },
      { title: 'The Band And I', imageUrl: 'https://example.com/song5.jpg' },
    ],
    minutesListened: '37,642',
    topGenre: 'Pop',
  };;

  return (
    <Container>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <Link href={'/wrapped/lastFm'}>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-red-700 min-h-[400px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            LastFM Wrapped
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Get your last.fm wrapped image with your top artists and songs for different time frames.
          </p>
        </div>
      </WobbleCard>
      </Link>

      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-green-900">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
      {/* <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI
            wrapper today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
      </WobbleCard> */}
    </div>
    </Container>

  );
}