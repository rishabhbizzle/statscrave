import React from 'react'
import { CalendarDays, MapPin, Ticket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ArtistEvents = ({ concerts }) => {
  if (!concerts?.items?.length) return null;

  const getMonthName = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  }

  return (
    <div className="my-10 md:my-16 relative">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-2xl font-bold tracking-tight">Upcoming Events</h3>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {concerts.items.map((event) => (
            <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="group relative h-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg hover:border-primary/50">
                {/* Decorative Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-5 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        {/* Date Badge */}
                        <div className="flex flex-col items-center justify-center bg-secondary/50 backdrop-blur-sm p-3 rounded-xl min-w-[70px] border border-border/50 group-hover:border-primary/30 transition-colors">
                            <span className="text-[11px] font-bold uppercase text-primary tracking-wider">
                                {getMonthName(event.date.isoString)}
                            </span>
                            <span className="text-2xl font-black leading-none mt-0.5">
                                {event.date.day}
                            </span>
                        </div>

                        {/* Title & Tag */}
                        <div className="flex-1 min-w-0">
                                <Badge variant="outline" className="mb-2 text-[10px] h-5 px-2 border-primary/30 text-primary bg-primary/5">
                                  {event.category}
                                </Badge>
                            <h4 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors" title={event.title}>
                                {event.title}
                            </h4>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6 flex-grow">
                        <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                            <span className="line-clamp-1">
                                {event.venue.name}, {event.venue.location.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <CalendarDays className="w-4 h-4 shrink-0 text-primary/70" />
                            <span>
                                {event.date.year} • {event.date.hour}:{event.date.minute.toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="-left-4 lg:-left-12" />
            <CarouselNext className="-right-4 lg:-right-12" />
        </div>
      </Carousel>
    </div>
  )
}

export default ArtistEvents
