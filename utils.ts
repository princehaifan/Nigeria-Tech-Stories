export const getToneLabel = (tone: number): string => {
    if (tone < -0.6) return 'Soft';
    if (tone < -0.2) return 'Sweet';
    if (tone < 0.2) return 'Neutral';
    if (tone < 0.6) return 'Witty';
    return 'Spicy';
};
