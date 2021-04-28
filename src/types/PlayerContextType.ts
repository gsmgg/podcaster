export type EpisodePlayer = {
    title: string;
    members: string;
    thumbnail: string;
    file: {
        duration: number;
        url: string;
    }
}

export type PlayerContextData = {
    episodeList: Array<EpisodePlayer>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    playFunction: (episode: EpisodePlayer) => void;
    playListFunction: (list: Array<EpisodePlayer>, index: number) => void;
    togglePlayFunction: () => void;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    playerControls: (action: string) => void;
}