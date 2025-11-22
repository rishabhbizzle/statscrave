"use client";
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { RATING_CONFIG } from '@/constants/reviewConstants';

const Meter = ({ stats }) => {
    const { total, counts } = stats;

    const data = useMemo(() => {
        // We want to show the distribution in the gauge? 
        // Or just a single value representing the average?
        // The screenshot shows a gauge that seems to be filled based on the "score".
        // But the text says "41%". 41% of what?
        // In the screenshot: "Timepass 41%", "Skip 30%", "Go for it 28%".
        // The big text "41%" matches the "Timepass" percentage.
        // So it seems to show the percentage of the *winning* category?
        // Or maybe it's a weighted average score normalized to 0-100?
        // "Moctale Meter" usually implies a score.
        // But the user said "rating system will be a bit different... See these screenshot".
        // In the second screenshot: "84% Go for it".
        // So it definitely highlights the top category.
        
        // Let's calculate percentages
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

    // For the gauge, we might want to show just the top category's color filling up?
    // Or the distribution? The screenshot shows a multi-colored arc.
    // Actually, the first screenshot shows Pink, Yellow, Green segments.
    // This suggests it shows the distribution of votes.
    // Let's try to replicate that.
    
    // Recharts Pie data for the gauge
    const chartData = data.filter(d => d.value > 0);

    return (
        <div className="bg-black/40 p-6 rounded-xl border border-white/10 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-white">StatsCrave Meter</h3>
            
            <div className="relative h-48 w-full flex justify-center items-end -mt-8">
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
                        <span className="text-xs text-gray-400 mt-1">
                            {total} Votes
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-6 space-y-3">
                {[...data].reverse().map(item => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="font-medium text-white">{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meter;
