import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Trophy, MapPin, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const ArtistStats = ({ stats }) => {
    if (!stats) return null;

    const { followers, monthlyListeners, worldRank, topCities } = stats;

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    // Calculate max listeners for progress bar scaling
    const maxListeners = topCities?.items?.length > 0 
        ? Math.max(...topCities.items.map(city => city.numberOfListeners)) 
        : 1;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Followers Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Followers
                    </CardTitle>
                    <Users className="h-4 w-4 " />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{formatNumber(followers)}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Total followers on Spotify
                    </p>
                </CardContent>
            </Card>

            {/* Monthly Listeners Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Monthly Listeners
                    </CardTitle>
                    <Music className="h-4 w-4 " />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{formatNumber(monthlyListeners)}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Listeners in the last 28 days
                    </p>
                </CardContent>
            </Card>

            {/* Top Cities Card - Spans 2 rows on large screens */}
            <Card className="md:row-span-2 bg-gradient-to-br from-primary/5 to-transparent border-none shadow-md hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Top Cities
                    </CardTitle>
                    <MapPin className="h-4 w-4 " />
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-5">
                        {topCities?.items?.map((city, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-muted-foreground w-4">{index + 1}</span>
                                        <span className="font-medium">{city.city}, {city.country}</span>
                                    </div>
                                    <span className="font-semibold">{formatNumber(city.numberOfListeners)}</span>
                                </div>
                                <Progress 
                                    value={(city.numberOfListeners / maxListeners) * 100} 
                                    className="h-2 bg-primary/20" 
                                    indicatorClassName="bg-primary"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* World Rank Card - Spans 2 columns */}
            <Card className="md:col-span-2 bg-gradient-to-br from-primary/10 to-transparent border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        World Rank
                    </CardTitle>
                    <Trophy className="h-4 w-4 " />
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                    <div>
                        <div className="text-4xl font-bold tracking-tight">{worldRank === 0 ? '-' : `#${worldRank}`}</div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Global monthly listeners ranking
                        </p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-muted-foreground/20" />
                </CardContent>
            </Card>
        </div>
    );
};

export default ArtistStats;
