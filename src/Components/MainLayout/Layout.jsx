"use client";

import NavBar from "@/Components/Header/Header";
import MyLibrary from "@/Components/MyLibrary/MyLibrary";
import { useMusicPlayer } from "@/ContextApi/playContext";
import PlayControl from "@/Components/Player/musicPlayer";

export default function MainLayout({ children }) {
  const { showFooter } = useMusicPlayer();

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* Navbar (fixed height) */}
      <div className="shrink-0">
        <NavBar />
      </div>

      {/* Middle area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Library */}
        <MyLibrary />

        {/* Page scroll area */}
        <main className="flex-1 overflow-y-auto m-2">{children}</main>
      </div>

      {/* Footer / Player (fixed height) */}
      {showFooter && (
        <div className="shrink-0">
          <PlayControl />
        </div>
      )}
    </div>
  );
}
