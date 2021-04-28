type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    file: {
        duration: number;
        url: string;
    }
}

export type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    playFunction: (episode: Episode) => void;
    togglePlayFunction: () => void;
    setPlayingState: (state: boolean) => void;
}