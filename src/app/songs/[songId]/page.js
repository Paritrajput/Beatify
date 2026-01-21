"use client";
import { useEffect, useState } from "react";
import { useMusicPlayer } from "@/ContextApi/playContext";
import { useUser } from "@/ContextApi/userContext";

const SongDetail = ({ params }) => {
  const { songId } = params;
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    playSong,
    playPause,
    isPlaying,
    currentSongId,
  } = useMusicPlayer();

  const { isLoggedIn } = useUser();

  /* ---------------- FETCH SONG ---------------- */
  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const res = await fetch(
          `/Api/user/getSongDetails?songId=${songId}`
        );
        const data = await res.json();
        setSong(data.song);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongDetails();
  }, [songId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-green-400 animate-pulse">
        Loading song…
      </div>
    );
  }

  if (!song) return <div className="p-6">Song not found</div>;

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)}:${`${Math.floor(sec % 60)}`.padStart(2, "0")}`;

  const isActive = currentSongId === song._id;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#2a2a2a] via-[#1b1b1b] to-black">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 blur-3xl opacity-30"
        style={{
          backgroundImage: `url(${song.coverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10">

        {/* HERO */}
        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-10">
          <img
            src={song.coverImg}
            alt={song.title}
            className="w-36 h-36 md:w-52 md:h-52 rounded-xl object-cover shadow-xl hover:scale-105 transition"
          />

          <div className="flex flex-col justify-end text-white">
            <span className="uppercase text-xs tracking-widest text-gray-400">
              Single
            </span>

            <h1 className="text-3xl md:text-6xl font-extrabold mt-2">
              {song.title}
            </h1>

            <p className="text-gray-300 mt-3">
              {song.artists} • {formatTime(song.duration)}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  isLoggedIn && playSong(song, [song])
                }
                className="px-8 py-3 rounded-full bg-green-500 text-black font-semibold hover:scale-105 transition"
              >
                {isActive && isPlaying ? "Pause" : "Play"}
              </button>

              {isActive && (
                <button
                  onClick={playPause}
                  className="px-6 py-3 rounded-full border border-gray-500 hover:bg-white/10 transition"
                >
                  Toggle
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SONG ROW */}
        <div className="px-4 md:px-8 pb-8">
          <div
            onClick={() => playSong(song, [song])}
            className={`group flex items-center gap-4 p-4 rounded-lg cursor-pointer transition
              ${isActive ? "bg-green-500/10" : "hover:bg-white/5"}`}
          >
            <span className="w-8 text-gray-400">1</span>

            <img
              src={song.coverImg}
              className="w-12 h-12 rounded-md"
            />

            <div className="flex-1">
              <p className="text-white font-medium">
                {song.title}
              </p>
              <p className="text-sm text-gray-400">
                {song.artists}
              </p>
            </div>

            <span className="hidden md:block text-gray-400 w-24 text-right">
              {formatTime(song.duration)}
            </span>

            <span className="text-green-400">
              {isActive && isPlaying ? "⏸" : "▶"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
