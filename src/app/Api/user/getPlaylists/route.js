import { NextResponse } from "next/server";
import dbConnect from "@/Utilities/db";
import { Playlist } from "@/Models/playlist.model";
import Song from "@/Models/song.model";

export const GET = async () => {
  try {
    await dbConnect();

    const playlists = await Playlist.find().populate("songs");

    return NextResponse.json({ playlists }, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
