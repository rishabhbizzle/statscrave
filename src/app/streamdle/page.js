import Container from "@/components/ui/container";
import StreamdleGame from "@/components/streamdle/StreamdleGame";

export const metadata = {
  title: "Streamdle: the daily Spotify streams guessing game | StatsCrave",
  description: "Ten rounds of 'which song has more Spotify streams?'. A new puzzle every day; keep your streak going and share your score.",
  openGraph: {
    title: "Streamdle | StatsCrave",
    description: "Which song has more Spotify streams? A new 10-round puzzle every day.",
  },
};

export default function StreamdlePage() {
  return (
    <Container>
      <div className="px-4 py-8 sm:px-0">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Streamdle</h1>
          <p className="mt-2 text-muted-foreground">
            Ten rounds, one question: which song has more Spotify streams? A new puzzle every day at 00:00 UTC.
          </p>
        </div>
        <StreamdleGame />
      </div>
    </Container>
  );
}
