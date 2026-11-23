export type Project = {
    order: number;
    name: string;
    period: string;
    impact: string;
    impactScore: number;
    difficultyScore: number;
    description: string;
    tech: string[];
    url?: string;
    favicon?: string;
    ecommerce?: boolean;
};
