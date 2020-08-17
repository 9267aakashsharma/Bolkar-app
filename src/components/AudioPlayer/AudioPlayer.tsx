import React, { useEffect, useState } from "react";
import "./AudioPlayer.scss";
import classNames from "classnames";
import { FaPlay, FaPause } from "react-icons/fa";
import { Song } from "../../App";

interface Props {
  activeSong: Song | undefined;
  setActiveSongId: (id: string | undefined) => void;
}

const AudioPlayer = (props: Props) => {
  const [currentSong, setCurrentSong] = useState<Song | undefined>(
    props.activeSong
  );
  const [lastSongPlayed, setLastSongPlayed] = useState<Song | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentSong(props.activeSong);
  }, [props.activeSong]);

  useEffect(() => {
    if (currentSong) {
      setLastSongPlayed(currentSong);
    }
  }, [currentSong]);

  return (
    <div className={classNames("audio-player", { active: lastSongPlayed })}>
      <div className="audio-player-inner">
        <div
          className="song-img"
          onClick={() => {
            if (currentSong) {
              props.setActiveSongId(undefined);
            } else {
              props.setActiveSongId(lastSongPlayed?._id);
            }
          }}
        >
          {currentSong ? <FaPause /> : <FaPlay />}
        </div>
        <div className="song-title">
          <p>{lastSongPlayed?.t}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
