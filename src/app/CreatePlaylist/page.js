"use client";

import { useUser } from "@/ContextApi/userContext";
import { useEffect, useState } from "react";

const DEFAULT_COVER =
  "https://res.cloudinary.com/dt1cqoxe8/image/upload/v1735934050/icons8-playlist-96_baucor.png";

const CreatePlaylist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSongsId, setSelectedSongsId] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const [coverImgFile, setCoverImgFile] = useState(null);
  const [coverImgPreview, setCoverImgPreview] = useState(DEFAULT_COVER);

  const [artists, setArtists] = useState([]);
  const [duration, setDuration] = useState(0);

  const { showFooter } = useUser();

  /* ---------------- SEARCH SONG ---------------- */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSongs([]);
      return;
    }

    const controller = new AbortController();

    const search = async () => {
      try {
        const res = await fetch(
          `/Api/admin/searchSong?search=${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSongs(data.songs || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      }
    };

    search();
    return () => controller.abort();
  }, [searchQuery]);

  /* ---------------- SELECT SONG ---------------- */
  const selectNewSong = (song) => {
    if (selectedSongs.some((s) => s._id === song._id)) return;

    setSelectedSongs((prev) => [...prev, song]);
    setSelectedSongsId((prev) => [...prev, song._id]);
  };

  const removeSelectedSong = (songId) => {
    setSelectedSongs((prev) => prev.filter((s) => s._id !== songId));
    setSelectedSongsId((prev) => prev.filter((id) => id !== songId));
  };

  /* ---------------- CALCULATE ARTISTS & DURATION ---------------- */
  useEffect(() => {
    const totalDuration = selectedSongs.reduce(
      (sum, song) => sum + (Number(song.duration) || 0),
      0
    );

    setDuration(totalDuration);

    const uniqueArtists = [
      ...new Set(
        selectedSongs.flatMap((s) =>
          Array.isArray(s.artists) ? s.artists : [s.artists]
        )
      ),
    ];

    setArtists(uniqueArtists);
  }, [selectedSongs]);

  /* ---------------- SUBMIT ---------------- */
  const addPlaylist = async () => {
    if (!playlistName || selectedSongs.length === 0) return;

    const formData = new FormData();
    formData.append("title", playlistName);
    formData.append("artists", JSON.stringify(artists));
    formData.append("songIds", JSON.stringify(selectedSongsId));
    formData.append("songNumber", selectedSongs.length);
    formData.append("duration", duration);

    if (coverImgFile) {
      formData.append("coverImg", coverImgFile);
    } else {
      formData.append("coverImg", DEFAULT_COVER);
    }

    try {
      const res = await fetch("/Api/user/addMyPlaylist", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Create playlist failed");

      alert("Playlist created successfully 🎉");
    } catch (err) {
      console.error("Create playlist error:", err);
      alert("Failed to create playlist");
    }
  };

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <div className="m-1 p-4 overflow-y-auto bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] rounded-xl w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-6 text-white mb-6">
        <div>
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-lg overflow-hidden bg-black">
            <img
              src={coverImgPreview}
              className="w-full h-full object-cover"
              alt="Playlist cover"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="mt-2 text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setCoverImgFile(file);
              setCoverImgPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        <div className="flex flex-col justify-end gap-3">
          <h1 className="text-3xl md:text-5xl font-bold">Create Playlist</h1>

          <input
            type="text"
            value={playlistName}
            placeholder="Playlist name"
            className="p-3 rounded-full text-black"
            onChange={(e) => setPlaylistName(e.target.value)}
          />

          <p className="text-gray-300 text-sm">
            {selectedSongs.length} songs • {minutes} min {seconds}s
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="search"
        placeholder="Search songs"
        className="w-full p-3 rounded-full bg-gray-800 text-white mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* SEARCH RESULTS */}
      {songs.length > 0 && (
        <Section title="Search Results">
          {songs.map((song) => (
            <SongRow
              key={song._id}
              song={song}
              onClick={() => selectNewSong(song)}
              actionIcon="/addImg.png"
            />
          ))}
        </Section>
      )}

      {/* SELECTED SONGS */}
      {selectedSongs.length > 0 && (
        <>
          <Section title="Selected Songs">
            {selectedSongs.map((song) => (
              <SongRow
                key={song._id}
                song={song}
                onClick={() => removeSelectedSong(song._id)}
                actionIcon="/cancelImg.png"
              />
            ))}
          </Section>

          <button
            onClick={addPlaylist}
            className="mt-6 px-6 py-3 bg-green-500 text-black rounded-full font-semibold hover:scale-105 transition"
          >
            Create Playlist
          </button>
        </>
      )}
    </div>
  );
};

export default CreatePlaylist;

/* ---------------- COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-white text-lg mb-2">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const SongRow = ({ song, onClick, actionIcon }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-3 bg-black/60 rounded-lg cursor-pointer hover:bg-black transition"
  >
    <div className="flex items-center gap-3 text-white">
      <img
        src={song.coverImg}
        className="w-10 h-10 rounded object-cover"
        alt={song.title}
      />
      <span>
        {song.title} –{" "}
        {Array.isArray(song.artists)
          ? song.artists.join(", ")
          : song.artists}
      </span>
    </div>

    <img src={actionIcon} className="h-6" alt="action" />
  </div>
);
