export interface TeamIconStyle {
    name: string;
    color: string;
}

const ICONS: TeamIconStyle[] = [
    { name: 'flame',              color: '#ff5722' },
    { name: 'water',              color: '#3b82f6' },
    { name: 'leaf',               color: '#10b981' },
    { name: 'planet',             color: '#8b5cf6' },
    { name: 'rocket',             color: '#f59e0b' },
    { name: 'fish',               color: '#06b6d4' },
    { name: 'paw',                color: '#f43f5e' },
    { name: 'star',               color: '#ffeb3b' },
    { name: 'barbell',            color: '#84cc16' },
    { name: 'trophy',             color: '#ec4899' },
];

export function teamIcon(teamId: number | null): TeamIconStyle {
    if (teamId == null) return { name: 'help-circle-outline', color: '#6b7280' };
    return ICONS[teamId % ICONS.length];
}
