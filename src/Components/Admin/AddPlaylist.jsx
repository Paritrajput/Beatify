"use client";

import { useEffect, useState } from "react";

const SearchSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSongsId, setSelectedSongsId] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [allArtists, setAllArtists] = useState("");
  const [artists, setArtists] = useState("");
  const [songNumber, setSongNumber] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (searchQuery == "") {
        return;
      }
      const response = await fetch(
        `/Api/admin/searchSong?search=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      setSongs(data.songs || []);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSongs([]);
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  const selectNewSong = (song) => {
    if (!selectedSongs.some((s) => s._id === song._id)) {
      setSelectedSongs((prev) => [...prev, song]);
      setSelectedSongsId((prev) => [...prev, song._id]);
      setAllArtists((prev) => [...prev, song.artists]);
      setArtists([...new Set(allArtists.flat())]);
    }
  };
  const removeSelectedSong = (songId) => {
    setSelectedSongs((prev) => prev.filter((song) => song._id !== songId));
    setSelectedSongsId((prev) => prev.filter((id) => id !== songId));
  };
  useEffect(() => {
    const totalDuration = selectedSongs.reduce(
      (sum, song) => sum + song.duration,
      0
    );

    setDuration(totalDuration);
  }, [selectedSongs]);

  const formData = new FormData();
  formData.append("title", playlistName);
  formData.append("artists", JSON.stringify(artists)); // Send as JSON string
  formData.append("coverImg", coverImg);
  formData.append("songIds", JSON.stringify(selectedSongsId)); // Send as JSON string
  formData.append("songNumber", songNumber);
  formData.append("duration", parseFloat(duration));
  const addPlaylist = async () => {
    try {
      const response = await fetch("/Api/admin/addPlaylist", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Playlist added successfully");
      } else {
        const errorData = await response.json();
        console.error("Error adding playlist:", errorData.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] ">
      <div className="flex flex-wrap gap-5 px-5 p-2">
        <input
          type="text"
          placeholder="Search for songs..."
          value={searchQuery}
          className="p-2 rounded-3xl text-black"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="text"
          value={playlistName}
          placeholder="enter playlist title"
          className="p-2 rounded-3xl text-black"
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImg(e.target.files[0])}
        />
        <button
          className="bg-green-700 p-2 border-md rounded-3xl"
          onClick={addPlaylist}
        >
          Create Playlist
        </button>
      </div>
      {selectedSongs.length > 0 && (
        <div className="p-2 ">
          <h1>Selected Songs</h1>
          <ul className="overflow-scroll max-h-56">
            {selectedSongs.map((song, index) => (
              <li key={song._id}>
                <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5 px-2">
                  <div className="flex items-center ">
                    <div>{index + 1}</div>
                    <img
                      src={song.coverImg}
                      alt={`${song.title} cover`}
                      className="h-10 w-auto rounded-[5px] px-3"
                    />
                    <div className="px-3">
                      {song.title} - {song.artists}
                    </div>
                  </div>
                  <div
                    className=""
                    onClick={() => removeSelectedSong(song._id)}
                  >
                    <img className="h-7" src="/cancelImg.png" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {songs.length > 0 && (
        <div className="p-2">
          <h1>Search Results</h1>
          <ul className="overflow-scroll max-h-56">
            {songs.map((song, index) => (
              <li key={song._id} onClick={() => selectNewSong(song)}>
                <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5">
                  <div className="flex items-center ">
                    <div>{index + 1}</div>
                    <img
                      src={song.coverImg}
                      alt={`${song.title} cover`}
                      className="h-10 w-auto rounded-[5px] px-3"
                    />
                    <div className="px-3">
                      {song.title} - {song.artists}
                    </div>
                  </div>
                  <div>
                    <img className="h-7" src="/addImg.png" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSongs;
