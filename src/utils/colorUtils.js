
// Helper to interpolate hex colors
export const lerpColor = (start, end, t) => {
    const startR = parseInt(start.slice(1, 3), 16);
    const startG = parseInt(start.slice(3, 5), 16);
    const startB = parseInt(start.slice(5, 7), 16);

    const endR = parseInt(end.slice(1, 3), 16);
    const endG = parseInt(end.slice(3, 5), 16);
    const endB = parseInt(end.slice(5, 7), 16);

    const r = Math.round(startR + (endR - startR) * t);
    const g = Math.round(startG + (endG - startG) * t);
    const b = Math.round(startB + (endB - startB) * t);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
