"use client";

import { useUser } from "@/ContextApi/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function MyProfile() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    showFooter,
  } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/Login");
    }
  }, [isLoggedIn, router]);

  const logout = async () => {
    try {
      const response = await fetch("/Api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) return null;

  return (
    <div
      className={`${
        showFooter ? "h-[78vh]" : "h-[89vh]"
      } w-full rounded-xl bg-gradient-to-b from-[#535151] to-[#1a1b1f]`}
    >
      {/* HEADER */}
      <div className="h-14 bg-[#0e1010] rounded-t-xl px-4 flex items-center text-2xl font-bold text-white">
        My Profile
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <img
            src="/userProfile.png"
            alt="Profile"
            className="w-20 h-20 rounded-full border border-gray-500"
          />

          <div className="text-lg text-white">
            <p className="font-semibold">
              Username:
              <span className="ml-2 text-gray-300">
                {user?.username || user?.email || "User"}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 active:scale-95 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
