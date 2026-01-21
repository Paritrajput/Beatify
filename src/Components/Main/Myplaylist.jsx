"use client";

import { useUser } from "@/ContextApi/userContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MyPlaylists = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { myPlaylists, setMyPlaylists, isLoggedIn } = useUser();

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!isLoggedIn) {
        setMyPlaylists([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/Api/user/getMyPlaylists");

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();
        setMyPlaylists(data.playlists || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [isLoggedIn, setMyPlaylists]);

  /* ---------------- STATES ---------------- */

  if (loading) return <div className="text-white">Loading playlists...</div>;

  if (error) return <div className="text-red-400">Error: {error}</div>;

  if (!isLoggedIn || !myPlaylists || myPlaylists.length === 0) return null;

  const playlistsToShow = showAll ? myPlaylists : myPlaylists.slice(0, 5);

  return (
    <div className="p-0 ss:p-4 rounded-t-lg mb-5">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          My Playlists
        </div>

        {myPlaylists.length > 5 && (
          <span
            className="text-white cursor-pointer text-sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </span>
        )}
      </div>

      <div className="flex flex-wrap mt-3 ss:mt-4 space-x-1 ss:space-x-4">
        {playlistsToShow.map((playlist) => (
          <div
            key={playlist._id}
            className="ss:w-48 ss:h-72 w-32 h-52 text-white relative mb-2 ss:m-3 rounded-md ss:rounded-xl cursor-pointer"
            onClick={() => router.push(`/myPlaylist/${playlist._id}`)}
          >
            <div className="ss:w-48 w-32 h-52 ss:h-72 bg-[#121212de] rounded-md ss:rounded-xl pt-1">
              <img
                src={
                  playlist.coverImg ||
                  "https://res.cloudinary.com/dt1cqoxe8/image/upload/v1735934050/icons8-playlist-96_baucor.png"
                }
                alt={playlist.title}
                className="ss:h-40 h-28 m-auto rounded-md ss:rounded-xl mt-1 ss:mt-3 object-cover"
              />

              <div className="w-full p-2 ss:p-4 pt-2 flex flex-col h-20 ss:h-28 overflow-hidden">
                <h2 className="ss:text-[large] font-medium truncate">
                  {playlist.title}
                </h2>

                <p className="text-[small] ss:text-[medium] text-gray-400 truncate">
                  {playlist.description || "No description available"}
                </p>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="ss:w-48 ss:h-72 w-32 h-52 bg-black/20 opacity-0 absolute rounded-[10px] top-0 hover:opacity-100 transition">
              <img
                src="/download-removebg-preview (9).png"
                alt="Play"
                className="ss:h-12 ss:w-12 h-7 w-7 absolute top-[90px] ss:top-[130px] right-3 ss:right-4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylists;
