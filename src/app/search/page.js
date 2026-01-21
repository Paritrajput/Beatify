"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/ContextApi/playContext";

/* ---------------- COMPONENT ---------------- */

const Search = () => {
  const router = useRouter();

  const {
    playSong,
    playPause,
    isPlaying,
    currentSongId,
  } = useMusicPlayer();

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- SEARCH ---------------- */

  useEffect(() => {
    if (!query.trim()) {
      setSongs([]);
      setPlaylists([]);
      setMyPlaylists([]);
      setArtists([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/Api/user/search?search=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        setSongs(data.songs || []);
        setPlaylists(data.playlists || []);
        setMyPlaylists(data.myPlaylists || []);
        setArtists(data.artists || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const formatTime = (sec = 0) =>
    `${Math.floor(sec / 60)}:${`${Math.floor(sec % 60)}`.padStart(2, "0")}`;

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] overflow-hidden">

      {/* HEADER */}
      <div className="bg-[#101010] p-4 rounded-t-2xl">
        <h1 className="text-2xl font-bold text-white mb-3">
          Search
        </h1>

        <div className="relative">
          <Image
            src="/search-icon.svg"
            alt="search"
            width={22}
            height={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full h-11 pl-12 pr-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* RESULTS */}
      <div className="p-4 space-y-8 overflow-y-auto h-[calc(100%-110px)]">

        {/* PLAYLISTS */}
        {playlists.length > 0 && (
          <Section title="Playlists">
            {playlists.map((pl) => (
              <Card
                key={pl._id}
                image={pl.coverImg}
                title={pl.title}
                onClick={() => router.push(`/playlist/${pl._id}`)}
              />
            ))}
          </Section>
        )}

        {/* MY PLAYLISTS */}
        {myPlaylists.length > 0 && (
          <Section title="My Playlists">
            {myPlaylists.map((pl) => (
              <Card
                key={pl._id}
                image={pl.coverImg}
                title={pl.title}
                onClick={() => router.push(`/my-playlists/${pl._id}`)}
              />
            ))}
          </Section>
        )}

        {/* SONGS */}
        {songs.length > 0 && (
          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Songs
            </h2>

            <div className="space-y-1">
              {songs.map((song, index) => {
                const isActive = currentSongId === song._id;

                return (
                  <div
                    key={song._id}
                    onClick={() => playSong(song, songs)}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition
                      ${
                        isActive
                          ? "bg-green-500/20"
                          : "hover:bg-white/5"
                      }`}
                  >
                    <span className="w-6 text-gray-400">
                      {index + 1}
                    </span>

                    <img
                      src={song.coverImg}
                      className="w-11 h-11 rounded-md"
                    />

                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {song.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {song.artists}
                      </p>
                    </div>

                    <span className="text-gray-400 text-sm">
                      {formatTime(song.duration)}
                    </span>

                    <span className="text-green-400 text-lg">
                      {isActive && isPlaying ? "⏸" : "▶"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-green-400 animate-pulse">
            Searching…
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

/* ---------------- HELPERS ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-white text-xl font-semibold mb-3">
      {title}
    </h2>
    <div className="flex flex-wrap gap-4">
      {children}
    </div>
  </div>
);

const Card = ({ image, title, onClick }) => (
  <div
    onClick={onClick}
    className="w-32 sm:w-40 h-48 sm:h-56 bg-[#121212] rounded-xl cursor-pointer hover:scale-105 transition"
  >
    <img
      src={image}
      className="w-full h-32 sm:h-40 object-cover rounded-t-xl"
    />
    <div className="p-3">
      <p className="text-white font-medium truncate">
        {title}
      </p>
    </div>
  </div>
);
