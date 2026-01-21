"use client";

import { useUser } from "@/ContextApi/userContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const MyLibrary = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoggedIn, myPlaylists, setShowPopup, showPopup } =
    useUser();

  const handleOpenPlaylist = (playlistId) => {
    router.push(`/myPlaylist/${playlistId}`);
  };

  const handleDeletePlaylist = (e, playlistId) => {
    e.stopPropagation();
    /////
    console.log("Delete playlist:", playlistId);
  };

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col p-2 pr-0">
      <div className="flex flex-col bg-[#0f0f0f] rounded-lg flex-1 overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between bg-[#101010] px-4 py-3 text-gray-400 text-lg font-medium">
          <Link
            href={isLoggedIn ? "/MyLibrary" : "/Login"}
            className="flex items-center gap-3 hover:text-white"
          >
            <LibraryIcon />
            <span>Your Library</span>
          </Link>

          <button
            onClick={() =>
              router.push(isLoggedIn ? "/CreatePlaylist" : "/Login")
            }
            className="text-xl hover:text-white"
          >
            +
          </button>
        </div>

        {/* PLAYLIST LIST */}
        <div className="flex-1 overflow-y-auto bg-[#171717] p-4 space-y-2">
          {isLoggedIn && myPlaylists?.length > 0 ? (
            myPlaylists.map((playlist) => {
              const isActive = pathname.includes(playlist._id);

              return (
                <div
                  key={playlist._id}
                  onClick={() => handleOpenPlaylist(playlist._id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition
                    ${
                      isActive
                        ? "bg-green-500/20"
                        : "bg-black/60 hover:bg-black"
                    }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Image
                      src={playlist.coverImg}
                      alt={playlist.title}
                      width={36}
                      height={36}
                      className="rounded"
                    />
                    <span className="truncate text-white">
                      {playlist.title}
                    </span>
                  </div>

                  <Image
                    src="/delete.png"
                    alt="delete"
                    width={18}
                    height={18}
                    className="opacity-70 hover:opacity-100"
                    onClick={(e) =>
                      handleDeletePlaylist(e, playlist._id)
                    }
                  />
                </div>
              );
            })
          ) : (
            <EmptyLibrary isLoggedIn={isLoggedIn} />
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-[#101010] p-4">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-400 rounded-full hover:border-white"
          >
            <Image
              src="/download-removebg-preview (8).png"
              alt="Language"
              width={20}
              height={20}
            />
            <span>English</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default MyLibrary;

/* ---------------- HELPERS ---------------- */

const LibraryIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="h-6">
    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" />
  </svg>
);

const EmptyLibrary = ({ isLoggedIn }) => (
  <div className="space-y-4">
    <div className="bg-[#2e2d2e] rounded-lg p-4 text-center space-y-2">
      <div>Create your first playlist</div>
      <div className="text-sm text-gray-300">
        It’s easy, we’ll help you
      </div>
      <Link
        href={isLoggedIn ? "/CreatePlaylist" : "/Login"}
        className="inline-block mt-3 px-4 py-1 bg-white text-black rounded-full font-medium"
      >
        Create Playlist
      </Link>
    </div>

    <div className="bg-[#2e2d2e] rounded-lg p-4 text-center space-y-2">
      <div>Let’s find some podcasts</div>
      <div className="text-sm text-gray-300">
        We’ll keep you updated
      </div>
      <Link
        href="/search"
        className="inline-block mt-3 px-4 py-1 bg-white text-black rounded-full font-medium"
      >
        Browse Podcasts
      </Link>
    </div>
  </div>
);
