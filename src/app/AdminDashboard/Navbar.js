"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();
  return (
    <div className="bg-[#0e1010] p-3">
      <div className="h-14  w-full text-3xl font-bold p-2">Dashboard</div>
      <ul className="flex items-center space-x-6 text-gray-400 text-lg font-medium">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link
            href="/AdminDashboard"
            className={`${
              router.asPath === "/AdminDashboard"
                ? "text-white font-bold"
                : "text-gray-400"
            } hover:text-white `}
          >
            Songs
          </Link>
        </li>
        <li>
          <Link
            href="/AdminDashboard/AddPlaylists"
            className={`${
              router.asPath === "/AdminDashboard/AddPlaylists"
                ? "text-white font-bold"
                : "text-gray-400"
            } hover:text-white `}
          >
            Playlists
          </Link>
        </li>
        <li>
          <Link
            href="/AdminDashboard/AddArtists"
            className={`${
              router.asPath === "/AdminDashboard/AddArtists"
                ? "text-white font-bold"
                : "text-gray-400"
            } hover:text-white `}
          >
            Artists
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
