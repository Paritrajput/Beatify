"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const audioRef = useRef(null);

  /* -------- GLOBAL PLAYER STATE -------- */
  const [queue, setQueue] = useState([]);              // current playlist
  const [currentSong, setCurrentSong] = useState(null); // song object
  const [currentSongId, setCurrentSongId] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showFooter, setShowFooter] = useState(false);

  /* -------- INIT AUDIO -------- */
  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRef.current = new Audio();
    }
  }, []);

  /* -------- CORE ACTION: PLAY SONG -------- */
  const playSong = (song, playlistSongs = []) => {
    if (!audioRef.current || !song?.link) return;

    setQueue(playlistSongs);
    setCurrentSong(song);
    setCurrentSongId(song._id);
    setShowFooter(true);

    audioRef.current.src = song.link;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.muted = isMuted;

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(console.error);
  };

  /* -------- PLAY / PAUSE -------- */
  const playPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  /* -------- NEXT / PREV -------- */
  const playNext = () => {
    if (!queue.length || !currentSong) return;

    const index = queue.findIndex(s => s._id === currentSong._id);
    const next = queue[(index + 1) % queue.length];
    playSong(next, queue);
  };

  const playPrev = () => {
    if (!queue.length || !currentSong) return;

    const index = queue.findIndex(s => s._id === currentSong._id);
    const prev = queue[(index - 1 + queue.length) % queue.length];
    playSong(prev, queue);
  };

  /* -------- AUDIO SETTINGS -------- */
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeVolume = (v) => {
    if (audioRef.current) audioRef.current.volume = v;
  };

  const changePlaybackSpeed = (speed) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        /* state */
        queue,
        currentSong,
        currentSongId,
        isPlaying,
        isMuted,
        playbackSpeed,
        showFooter,
        audioRef,

        /* actions */
        playSong,
        playPause,
        playNext,
        playPrev,
        toggleMute,
        changeVolume,
        changePlaybackSpeed,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
