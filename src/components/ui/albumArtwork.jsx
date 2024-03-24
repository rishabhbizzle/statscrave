import Image from "next/image"
import { cn } from "@/lib/utils"


export function AlbumArtwork({
  album,
  aspectRatio = "square",
  width,
  height,
  className,
  ...props
}) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
          <div className="overflow-hidden rounded-md">
            <img
              src={album?.albumDetails?.images[0]?.url}
              alt={album?.albumDetails?.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 rounded-xl",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album?.albumDetails?.name}</h3>
        {/* <p className="text-xs text-muted-foreground">{album.type}</p> */}
      </div>
    </div>
  )
}