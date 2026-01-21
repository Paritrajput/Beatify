import { NextResponse } from "next/server";
import Song from "@/Models/song.model";
import dbConnect from "@/Utilities/db";
import { Playlist } from "@/Models/playlist.model";
import { myPlaylist } from "@/Models/myPlaylist.model";
import { Artist } from "@/Models/artist.model";

export const GET = async (req) => {
  try {
    // Connect to the database
    await dbConnect();

    // Get search query parameter
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search) {
      return NextResponse.json(
        { error: "Search query is required." },
        { status: 400 }
      );
    }

    // Perform a case-insensitive search for songs based on title or artists
    const songs = await Song.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Match title
        { artists: { $regex: search, $options: "i" } }, // Match artists
      ],
    });
    const playlists = await Playlist.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Match title
        { artists: { $regex: search, $options: "i" } }, // Match artists
      ],
    });

    const myPlaylists = await myPlaylist.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Match title
        { artists: { $regex: search, $options: "i" } }, // Match artists
      ],
    });
    const artists = await Artist.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Match title
        { artists: { $regex: search, $options: "i" } }, // Match artists
      ],
    });

    return NextResponse.json(
      { songs, playlists, myPlaylists, artists },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
};
