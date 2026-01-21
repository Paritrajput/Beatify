"use client";
import SearchSongs from "@/Components/Admin/AddPlaylist";
import AddSong from "@/Components/Admin/AddSong";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <div>
      <AddSong />
    </div>
  );
}

export default page;
