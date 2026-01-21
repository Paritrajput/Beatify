"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [error, setError] = useState("");
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const [newPlaylistAdmin, setNewPlaylistAdmin] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/Api/user/userDetail");
      if (!response.ok) {
        console.log("response not ok");
        setIsLoggedIn(false);
        throw new Error("Unauthorized");
      }
      const data = await response.json();
      console.log(data);
      setUser(data.user.username);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("error :", err);
      setError("You must be logged in to access this page.");
      setIsLoggedIn(false);
    }
  };

  const togglePolicy = () => {
    console.log(showPolicy);
    setShowPolicy(!showPolicy);
  };
  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        fetchUserDetails,
        myPlaylists,
        setMyPlaylists,
        showPopup,
        setShowPopup,
        togglePolicy,
        toggleTerms,
        setShowPolicy,
        setShowTerms,
        showPolicy,
        showTerms,
        showmenu,
        setShowmenu,
        newPlaylistAdmin,
        setNewPlaylistAdmin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  console.log("useUser context:", context); // Debugging log
  if (!context) {
    throw new Error("useUser must be used within a userProvider");
  }
  return context;
};
