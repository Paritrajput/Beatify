"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/ContextApi/playContext";
import Loading from "@/Components/Loading/loading";

const PLAYLIST_THEMES = [
  {
    bg: "from-[#1f4037] to-[#0b1f1a]",
    rowHover: "hover:bg-green-500/10",
    rowActive: "bg-green-500/20",
    accent: "text-green-400",
  },
  {
    bg: "from-[#41295a] to-[#2F0743]",
    rowHover: "hover:bg-purple-500/10",
    rowActive: "bg-purple-500/20",
    accent: "text-purple-400",
  },
  {
    bg: "from-[#232526] to-[#414345]",
    rowHover: "hover:bg-blue-500/10",
    rowActive: "bg-blue-500/20",
    accent: "text-blue-400",
  },
  {
    bg: "from-[#3a1c71] to-[#d76d77]",
    rowHover: "hover:bg-pink-500/10",
    rowActive: "bg-pink-500/20",
    accent: "text-pink-400",
  },
  {
    bg: "from-[#0f2027] to-[#203a43]",
    rowHover: "hover:bg-teal-500/10",
    rowActive: "bg-teal-500/20",
    accent: "text-teal-400",
  },
];

const getThemeByPlaylistId = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PLAYLIST_THEMES[Math.abs(hash) % PLAYLIST_THEMES.length];
};

const PlaylistDetail = ({ params }) => {
  const { playlistId } = params;
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  const {
    playSong,
    currentSongId,
    isPlaying,
  } = useMusicPlayer();

  const theme = useMemo(
    () => getThemeByPlaylistId(playlistId),
    [playlistId]
  );

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(
          `/Api/user/getPlaylistSongs?playlistId=${playlistId}`
        );
        const data = await res.json();
        setPlaylist(data.playlist);
      } catch {
        setError("Failed to load playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (loading) return <Loading />;
  if (error || !playlist)
    return <div className="p-6 text-red-500">{error}</div>;

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)}:${`${Math.floor(sec % 60)}`.padStart(2, "0")}`;

  return (
    <div
      className={`w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b ${theme.bg} animate-fadeIn`}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-6 p-5 md:p-8">
        <img
          src={playlist.coverImg}
          alt={playlist.title}
          className="w-36 h-36 md:w-52 md:h-52 rounded-xl object-cover shadow-xl"
        />

        <div className="flex flex-col justify-end text-white">
          <span className="uppercase text-xs tracking-widest text-gray-300">
            Playlist
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold mt-2">
            {playlist.title}
          </h1>

          <p className="text-gray-300 mt-2 text-sm md:text-base">
            {playlist.artists.join(", ")} • {playlist.songs.length} songs •{" "}
            {formatTime(playlist.duration)}
          </p>
        </div>
      </div>

      {/* SONG LIST */}
      <div className="px-3 md:px-8 pb-8 space-y-1">
        {playlist.songs.map((song, index) => {
          const isActive = currentSongId === song._id;

          return (
            <div
              key={song._id}
              className={`flex items-center gap-4 p-3 rounded-lg transition cursor-pointer
                ${isActive ? theme.rowActive : theme.rowHover}`}
              onClick={() => playSong(song, playlist.songs)}
            >
              <div className="w-8 text-gray-300">{index + 1}</div>

              <img
                src={song.coverImg}
                alt={song.title}
                className="w-11 h-11 rounded-md object-cover"
              />

              <div
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/songs/${song._id}`);
                }}
              >
                <p className="text-white font-medium">{song.title}</p>
                <p className="text-sm text-gray-400 md:hidden">
                  {song.artists}
                </p>
              </div>

              <div className="hidden md:block w-32 text-gray-400 truncate">
                {song.artists}
              </div>

              <div className="hidden md:block w-20 text-gray-400 text-right">
                {formatTime(song.duration)}
              </div>

              <span className={`${theme.accent} text-lg`}>
                {isActive && isPlaying ? "⏸" : "▶"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistDetail;
