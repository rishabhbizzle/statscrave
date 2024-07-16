import WrappedImage from "@/components/user-top-list/Wrapped";

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
    <div>
      <h1>Your Spotify Wrapped</h1>
      <WrappedImage userData={userData} />
    </div>
  );
}