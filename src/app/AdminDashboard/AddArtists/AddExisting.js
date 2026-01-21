"use client";

import { useEffect, useState } from "react";

const ManageArtistSongs = () => {
  const [searchArtistQuery, setSearchArtistQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);

  const [searchSongQuery, setSearchSongQuery] = useState("");
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]); // To hold selected songs for bulk addition

  // Search artists
  const handleSearchArtists = async () => {
    try {
      if (searchArtistQuery == "") {
        return;
      }
      const response = await fetch(
        `/Api/admin/searchArtist?search=${encodeURIComponent(
          searchArtistQuery
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch artists.");
      const data = await response.json();
      console.log(data.enrichedArtists);
      setArtists(data.enrichedArtists || []);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  useEffect(() => {
    if (searchArtistQuery === "") {
      setArtists([]);
    } else {
      handleSearchArtists();
    }
  }, [searchArtistQuery]);

  // Select an artist
  const selectArtist = (artist) => {
    setSelectedArtist(artist);
    setArtistSongs(artist.songs || []);
  };

  // Search songs
  const handleSearchSongs = async () => {
    try {
      if (searchSongQuery == "") {
        return;
      }
      const response = await fetch(
        `/Api/admin/searchSong?search=${searchSongQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch songs.");
      const data = await response.json();

      setAvailableSongs(data.songs || []);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };
  useEffect(() => {
    if (searchSongQuery === "") {
      setAvailableSongs([]);
    } else {
      handleSearchSongs();
    }
  }, [searchSongQuery]);

  // Add song to selectedSongs array for bulk addition
  const SongSelection = (song) => {
    const uniqueSong = selectedSongs.filter(
      (selectedSong) => selectedSong._id === song._id
    );
    if (uniqueSong.length == 0) {
      setSelectedSongs([...selectedSongs, song]);
    } else {
      console.log("song already selected");
    }
  };
  const removeSongSelection = (song) => {
    const updateSelectedSong = selectedSongs.filter(
      (selectedSong) => selectedSong._id !== song._id
    );
    setSelectedSongs(updateSelectedSong);
  };

  // Add selected songs to artist
  const addSelectedSongsToArtist = async () => {
    try {
      const songIds = selectedSongs.map((song) => song._id);
      const response = await fetch(`/Api/admin/addArtist/addExisting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: selectedArtist._id, songIds }),
      });
      if (!response.ok) throw new Error("Failed to update artist songs.");
      const data = await response.json();
      setArtistSongs(data.artist.songs); // Update UI with the new song list
      setSelectedSongs([]); // Clear selected songs after adding
    } catch (error) {
      console.error("Error adding songs to artist:", error);
    }
  };
  let index = 0;
  let index2 = 0;
  let index3 = 0;

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="text-2xl font-bold">Add Songs To Artists</div>
      <div>
        <input
          type="text"
          placeholder="Search artists..."
          value={searchArtistQuery}
          className="p-2 rounded-3xl text-black"
          onChange={(e) => setSearchArtistQuery(e.target.value)}
        />
        <button
          onClick={handleSearchArtists}
          className="p-2 ml-3 rounded-3xl text-white bg-green-700"
        >
          Search Artists
        </button>
        <ul className="text-white h-1/3 overflow-y-scroll mt-3">
          {artists.map((artist) => (
            <li key={artist._id} onClick={() => selectArtist(artist)}>
              <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5">
                <div className="flex items-center ">
                  <div>{(index = index + 1)}</div>
                  <img
                    src={artist.coverImg}
                    alt={`${artist.title} cover`}
                    className="h-10 w-auto rounded-[5px] px-3"
                  />
                  <div className="px-3">{artist.title}</div>
                </div>
                <div>
                  <img className="h-7" src="/addImg.png" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedArtist && (
        <div>
          <div className="h-10 w-full bg-[#0e1010] text-2xl font-bold p-2">
            Selected Artist: {selectedArtist.title}
          </div>
          <h3>Existing Songs:</h3>
          <ul>
            {artistSongs.map((song) => (
              <li key={song._id}>
                <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5 px-2">
                  <div className="flex items-center ">
                    <div>{(index2 = index2 + 1)}</div>
                    <img
                      src={song.coverImg}
                      alt={`${song.title} cover`}
                      className="h-10 w-auto rounded-[5px] px-3"
                    />
                    <div className="px-3">{song.title}</div>
                  </div>
                  {/* <div className="" onClick={() => removeSelectedSong(song._id)}>
                <img className="h-7" src="/cancelImg.png" />
              </div> */}
                </div>
              </li>
            ))}
          </ul>

          {/* Search and Add Songs */}
          <input
            type="text"
            placeholder="Search songs..."
            value={searchSongQuery}
            className="p-2 rounded-3xl text-black"
            onChange={(e) => setSearchSongQuery(e.target.value)}
          />
          <button
            onClick={handleSearchSongs}
            className="p-2 ml-3 rounded-3xl text-white bg-green-700"
          >
            Search Songs
          </button>
          <ul className="flex flex-wrap">
            {selectedSongs.map((song) => (
              <li
                key={song._id}
                className="flex flex-wrap bg-gray-800 rounded-3xl px-2 gap-1 items-center"
              >
                <div>{song.title}</div>
                <img
                  src="/cancelImg.png"
                  className="h-4"
                  onClick={() => removeSongSelection(song)}
                />
              </li>
            ))}
          </ul>
          <ul className="mt-3 max-h-48 overflow-scroll">
            {availableSongs.map((song) => (
              <li key={song._id} onClick={() => SongSelection(song)}>
                <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5 px-2">
                  <div className="flex items-center ">
                    <div>{(index3 = index3 + 1)}</div>
                    <img
                      src={song.coverImg}
                      alt={`${song.title} cover`}
                      className="h-10 w-auto rounded-[5px] px-3"
                    />
                    <div className="px-3">{song.title}</div>
                  </div>
                  <div className="">
                    <img className="h-7" src="/addImg.png" />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {selectedSongs.length > 0 && (
            <button
              onClick={addSelectedSongsToArtist}
              disabled={!selectedSongs.length}
              className="p-2 ml-3 rounded-3xl text-white bg-green-700"
            >
              Add Selected Songs
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageArtistSongs;
