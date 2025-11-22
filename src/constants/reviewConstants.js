export const RATING_CONFIG = {
    5: { label: 'Masterpiece', color: '#a855f7', value: 5, bg: 'bg-purple-500', text: 'text-purple-500' }, // Purple
    4: { label: 'Banger', color: '#10b981', value: 4, bg: 'bg-green-500', text: 'text-green-500' }, // Green
    3: { label: 'Decent', color: '#3b82f6', value: 3, bg: 'bg-blue-500', text: 'text-blue-500' }, // Blue
    2: { label: 'Mid', color: '#eab308', value: 2, bg: 'bg-yellow-500', text: 'text-yellow-500' }, // Yellow
    1: { label: 'Skip', color: '#ef4444', value: 1, bg: 'bg-red-500', text: 'text-red-500' }, // Red
};

export const RATING_OPTIONS = [
    RATING_CONFIG[1],
    RATING_CONFIG[2],
    RATING_CONFIG[3],
    RATING_CONFIG[4],
    RATING_CONFIG[5],
];
