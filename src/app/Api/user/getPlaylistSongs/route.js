import { NextResponse } from "next/server";
import dbConnect from "@/Utilities/db";
import { Playlist } from "@/Models/playlist.model";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");

    /* ---------------- VALIDATION ---------------- */
    if (!playlistId) {
      return NextResponse.json(
        { error: "Playlist ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return NextResponse.json(
        { error: "Invalid playlist ID" },
        { status: 400 }
      );
    }

    /* ---------------- DB ---------------- */
    await dbConnect();

    const playlist = await Playlist
      .findById(playlistId)
      .populate("songs");

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { playlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching playlist:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
