import { NextResponse } from "next/server";

import dbConnect from "@/Utilities/db";
import Song from "@/Models/song.model";

export async function GET(req) {
  try {
    // Parse songId from query parameters
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get("songId");

    if (!songId) {
      return NextResponse.json(
        { error: "Song ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the song by ID
    const song = await Song.findById(songId);

    if (!song) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 });
    }

    // Return the song details
    return NextResponse.json({ song }, { status: 200 });
  } catch (error) {
    console.error("Error fetching song details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
