import React from "react";
import classNames from "classnames";
import { Song } from "../../App";
import Play from "../../assets/icons/play.png";
import Pause from "../../assets/icons/pause.png";
import "./SongList.scss";

interface SongListProps {
  songs: Song[];
  activeSongId: string | undefined;
  setActiveSongId: (id: string | undefined) => void;
}

const SongList = (props: SongListProps) => {
  return (
    <div className="list">
      <div className="list-inner">
        {props.songs.map((song) => {
          return (
            <SongListItem
              song={song}
              key={song._id}
              playing={song._id === props.activeSongId}
              onTogglePlay={(id: string) => {
                if (props.activeSongId === id) {
                  props.setActiveSongId(undefined);
                } else {
                  props.setActiveSongId(id);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SongListItemProps {
  song: Song;
  playing: boolean;
  onTogglePlay: (id: string) => void;
}

const SongListItem = (props: SongListItemProps) => {
  return (
    <div
      className={classNames("song-list-item", { active: props.playing })}
      onClick={() => {
        props.onTogglePlay(props.song._id);
      }}
    >
      <div className="item-img">
        {props.playing ? <img src={Pause} /> : <img src={Play} />}
      </div>
      <div className="item-title">
        <p>{props.song.t}</p>
      </div>
    </div>
  );
};

export default SongList;
