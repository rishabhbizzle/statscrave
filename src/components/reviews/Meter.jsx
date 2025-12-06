"use client";
import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

import { RATING_CONFIG } from '@/constants/reviewConstants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShareableMeterCard } from './ShareableCards';
import { useShareImage } from '@/hooks/useShareImage';

const Meter = ({ stats, targetName, targetType, coverImage, artistName }) => {
    const { total, counts } = stats;
    const [isSharing, setIsSharing] = useState(false);
    const { elementRef: shareRef, captureAndShare } = useShareImage();

    const data = useMemo(() => {
        if (total === 0) return [];

        return Object.keys(RATING_CONFIG).map(key => {
            const config = RATING_CONFIG[key];
            return {
                name: config.label,
                value: counts[config.value] || 0,
                percentage: Math.round(((counts[config.value] || 0) / total) * 100),
                color: config.color,
                ratingValue: config.value
            };
        });
    }, [counts, total]);

    const topCategory = useMemo(() => {
        if (data.length === 0) return null;
        return data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    }, [data]);
    const chartData = data.filter(d => d.value > 0);

    const handleShare = async () => {
        setIsSharing(true);
        try {
            const filename = `statscrave-meter-${targetName?.replace(/\s+/g, '-')?.toLowerCase() || 'review'}.png`;
            await captureAndShare(filename);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <>
            {/* Hidden shareable card for capture */}
            <ShareableMeterCard
                ref={shareRef}
                stats={stats}
                targetName={targetName}
                targetType={targetType}
                coverImage={coverImage}
                artistName={artistName}
            />

            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">StatsCrave Meter</CardTitle>
                        <button
                            onClick={handleShare}
                            style={{
                                zIndex: 100
                            }}
                            disabled={isSharing || total === 0}
                            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10 disabled:opacity-50"
                            title="Share meter"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                
                <div className="relative h-48 w-full flex justify-center items-end -mt-8"
                style={{
                    zIndex: 50
                }}
                >
                    {total > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    wrapperStyle={{ zIndex: 100 }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md">
                                                    <p className="font-medium" style={{ color: data.color }}>
                                                        {data.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {data.value} votes ({data.percentage}%)
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                         <div className="text-gray-500 text-sm mb-8">No votes yet</div>
                    )}
                    
                    {total > 0 && topCategory && (
                        <div className="absolute bottom-0 flex flex-col items-center mb-2">
                            <span className="text-4xl font-bold" style={{ color: topCategory.color }}>
                                {topCategory.percentage}%
                            </span>
                            <span className="text-xs text-muted-foreground mt-1">
                                {total} Votes
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-6 space-y-3">
                    {[...data]?.reverse()?.map(item => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="font-medium text-foreground">{item.percentage}%</span>
                        </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Meter;
