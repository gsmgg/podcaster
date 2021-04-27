export type Episodes = {
    id: string;
    title: string;
    members: string;
    published_at: string;
    published_at_formated: string;
    thumbnail: string;
    description: string;
    file: {
        url: string;
        type: string;
        duration: number;
        duration_formated: string;
    };
};