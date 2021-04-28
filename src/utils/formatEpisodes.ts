import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Episodes } from "../types/episodeType";
import { convertDurationToTimeString } from "./convertDurationToTimeString";

export function formatEpisodes(data) {
    return data.map((episodes: Episodes) => {
        return {
            id: episodes.id,
            title: episodes.title,
            members: episodes.members,
            published_at: episodes.published_at,
            published_at_formated: format(
                parseISO(episodes.published_at),
                "d MMM yy",
                { locale: ptBR }
            ),
            thumbnail: episodes.thumbnail,
            description: episodes.description,
            file: {
                url: episodes.file.url,
                type: episodes.file.type,
                duration: Number(episodes.file.duration),
                duration_formated: convertDurationToTimeString(
                    Number(episodes.file.duration)
                ),
            },
        };
    });
}