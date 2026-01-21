"use client";
import { useMusicPlayer } from "@/ContextApi/playContext";
import { useEffect, useState } from "react";

const PlayControl = () => {
  const {
    queue,
    currentSongIndex,
    currentSongId,
    isPlaying,
    playPause,
    playNext,
    playPrev,
    toggleMute,
    changeVolume,
    playbackSpeed,
    changePlaybackSpeed,
    isMuted,
    audioRef,
    showFooter,
  } = useMusicPlayer();


  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ---------------- AUDIO EVENTS ---------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, [audioRef]);

  if (!showFooter || currentSongIndex === null) return null;

  const song = queue[currentSongIndex];

  const formatTime = (t = 0) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <footer className="shrink-0 bg-black border-t border-gray-800 px-3 py-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        {/* LEFT: SONG INFO */}
        <div className="flex items-center gap-3 md:w-1/4 min-w-0">
          <img
            src={song?.coverImg}
            alt={song?.title}
            className="w-10 h-10 rounded"
          />
          <div className="truncate">
            <p className="text-sm font-medium truncate">
              {song?.title}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {song?.artists}
            </p>
          </div>
        </div>

        {/* CENTER: CONTROLS */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="flex items-center gap-4 mb-1">
            <button onClick={playPrev}>⏮</button>

            <button
              onClick={playPause}
              className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button onClick={playNext}>⏭</button>
          </div>

          {/* SEEK BAR */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs w-8 text-right">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              className="flex-1 h-1"
            />

            <span className="text-xs w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT: VOLUME */}
        <div className="hidden md:flex items-center gap-3 w-1/4 justify-end">
          <button onClick={toggleMute}>
            {isMuted ? "🔇" : "🔊"}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={audioRef.current?.volume ?? 1}
            onChange={(e) => changeVolume(e.target.value)}
            className="w-24 h-1"
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayControl;
