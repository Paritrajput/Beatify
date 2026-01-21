"use client";

import React, { useState } from "react";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artists, setArtists] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleSongUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artists", artists);
    formData.append("coverImg", coverImg);
    formData.append("audioFile", audioFile);

    const res = await fetch("/Api/admin/uploadSong", {
      method: "POST",

      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
    } else {
      alert("Song uploaded successfully");
    }
  };

  return (
    <div className="p-5 bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))]">
      <form encType="multipart/form-data" onSubmit={handleSongUpload}>
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          className="text-black py-2 px-5 rounded-3xl m-2 "
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artists (comma separated)"
          value={artists}
          className="text-black py-2 px-5 rounded-3xl m-2"
          onChange={(e) => setArtists(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImg(e.target.files[0])}
          className="bg-gray-800 p-2 rounded-xl w-fit m-3"
        />
        <label>Image Upload</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          className="bg-gray-800 p-2 rounded-xl m-3"
        />
        <label>Audio Upload</label>
        <button
          type="submit"
          className="bg-green-400 py-2 px-3 rounded-3xl text-black m-3"
        >
          Upload Song
        </button>
      </form>
    </div>
  );
};

export default AddSong;
