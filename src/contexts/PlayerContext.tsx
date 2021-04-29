import id from "date-fns/esm/locale/id/index.js";
import { createContext, useState, ReactNode } from "react";
import { PlayerContextData } from "../types/PlayerContextType";
import { EpisodePlayer } from "../types/PlayerContextType";

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvider = {
  children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProvider) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function playFunction(episode: EpisodePlayer) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playListFunction(list: Array<EpisodePlayer>, index: number) {
    console.log("list => ", list, "  index => ", index);
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlayFunction() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoopFunction() {
    setIsLooping(!isLooping);
  }

  function toggleSuffleFunction() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasNext = isShuffling || currentEpisodeIndex > 0;
  const hasPrevious = episodeList.length > currentEpisodeIndex + 1;

  function playerControls(action: string) {
    console.log(currentEpisodeIndex);

    switch (action) {
      case "next":
        if (isShuffling) {
          setCurrentEpisodeIndex(
            Math.floor(Math.random() * episodeList.length)
          );
        } else if (hasNext) {
          setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
        break;

      case "previous":
        if (hasPrevious) {
          setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
        break;

      case "shuffle":
        toggleSuffleFunction();

        break;

      case "loop":
        toggleLoopFunction();
        break;
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList: episodeList,
        currentEpisodeIndex: currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        playFunction,
        playListFunction,
        togglePlayFunction,
        setPlayingState,
        hasNext,
        hasPrevious,
        playerControls,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
