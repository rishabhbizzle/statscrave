import Link from "next/link";
import { Gamepad2, ArrowRight } from "lucide-react";

// Home page nudge to the daily game.
export default function StreamdleCta() {
  return (
    <Link
      href="/streamdle"
      className="group my-6 flex w-full items-center gap-4 rounded-2xl border bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-4 transition-colors hover:border-primary md:w-[80%]"
    >
      <div className="rounded-xl bg-primary/15 p-3 text-primary">
        <Gamepad2 className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-bold">Play today&apos;s Streamdle</div>
        <div className="text-sm text-muted-foreground">Which song has more Spotify streams? 10 rounds, new puzzle daily.</div>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
