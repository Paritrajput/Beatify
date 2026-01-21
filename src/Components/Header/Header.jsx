"use client";

import { useUser } from "@/ContextApi/userContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NavBar = () => {
  const { showmenu, setShowmenu, isLoggedIn, user, fetchUserDetails } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Fetch user only once if not available
  useEffect(() => {
    if (isLoggedIn && !user) {
      fetchUserDetails?.();
    }
  }, [isLoggedIn, user, fetchUserDetails]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showmenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showmenu]);

  return (
    <nav className="sticky top-0 z-50 bg-[#0e1010] rounded-t-lg">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Image
          src="/logo_beatify.png"
          alt="Logo"
          width={100}
          height={40}
          className="h-10 w-auto cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-400 text-lg font-medium">
          <NavLink href="/" active={pathname === "/"} label="Home" />
          <NavLink href="/search" active={pathname === "/search"} label="Search" />
          <NavLink
            href={isLoggedIn ? "/MyLibrary" : "/Login"}
            active={pathname === "/MyLibrary"}
            label="Your Library"
          />

          {user?.role === "admin" && (
            <button
              onClick={() => router.push("/AdminDashboard")}
              className="hover:text-white"
            >
              Admin
            </button>
          )}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Image
              src="/userProfile.png"
              alt="Profile"
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
              onClick={() => router.push("/MyProfile")}
            />
          ) : (
            <button
              onClick={() => router.push("/Login")}
              className="bg-white text-black font-bold rounded-full px-5 py-2"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setShowmenu(prev => !prev)}
          >
            <Image
              src={showmenu ? "/cross.png" : "/showMenu.png"}
              alt="menu"
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showmenu && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="absolute top-16 left-0 w-full bg-[#0e1010] p-6 space-y-6 text-lg">
            <MobileLink href="/" label="Home" onClick={setShowmenu} />
            <MobileLink href="/search" label="Search" onClick={setShowmenu} />
            <MobileLink
              href={isLoggedIn ? "/MyLibrary" : "/Login"}
              label="Your Library"
              onClick={setShowmenu}
            />

            {user?.role === "admin" && (
              <MobileLink
                href="/AdminDashboard"
                label="Admin"
                onClick={setShowmenu}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, label, active }) => (
  <Link
    href={href}
    className={`hover:text-white ${
      active ? "text-white font-semibold" : ""
    }`}
  >
    {label}
  </Link>
);

const MobileLink = ({ href, label, onClick }) => (
  <Link
    href={href}
    onClick={() => onClick(false)}
    className="block text-gray-300 hover:text-white"
  >
    {label}
  </Link>
);

export default NavBar;
