"use client";
import { useEffect, useState } from "react";
import AddNewArtists from "./AddNew";
import AddExistingArtists from "./AddExisting";
import { useUser } from "@/ContextApi/userContext";
import ManageArtistSongs from "./AddExisting";

const addArtists = () => {
  const { newPlaylistAdmin, setNewPlaylistAdmin } = useUser();
  return (
    <div className="bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] p-3">
      <ul className="flex gap-8 m-1 p-3">
        <li onClick={() => setNewPlaylistAdmin(true)}>AddNewArtists</li>
        <li onClick={() => setNewPlaylistAdmin(false)}>
          AddSongsToExistingArtists
        </li>
      </ul>
      <div>{newPlaylistAdmin ? <AddNewArtists /> : <ManageArtistSongs />}</div>
    </div>
  );
};

export default addArtists;
