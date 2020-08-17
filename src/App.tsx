import React, { useEffect, useState } from "react";
import SongList from "./components/SongList/SongList";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import "./App.scss";

export interface Song {
  cat: number;
  d: string;
  f: number;
  fTp: string[];
  lan: string;
  n: string;
  s: number;
  sc: number;
  seo: number;
  t: string;
  text: string;
  tp: number;
  u: string;
  uid: string;
  __v: number;
  _id: string;
}

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [activeSong, setActiveSong] = useState<Song | undefined>(undefined);
  const [activeSongId, setActiveSongId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const url = "https://3.132.68.57:8080/v1/getRankedAnswers";
        const response = await fetch(url);
        const apiData = await response.json();
        await setSongs(apiData);
      } catch (err) {
        setError(true);
        console.error(err);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!activeSongId) {
      setActiveSong(undefined);
    } else {
      songs.forEach((song: Song) => {
        if (song._id === activeSongId) {
          setActiveSong(song);
        }
      });
    }
  }, [activeSongId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Unable to collect data</p>;
  }

  return (
    <div className="App">
      {songs.length > 0 ? (
        <div className="player">
          <SongList
            songs={songs}
            activeSongId={activeSongId}
            setActiveSongId={setActiveSongId}
          />
          <AudioPlayer
            activeSong={activeSong}
            setActiveSongId={setActiveSongId}
          />
        </div>
      ) : (
        <div>No Songs</div>
      )}
    </div>
  );
};

export default App;
