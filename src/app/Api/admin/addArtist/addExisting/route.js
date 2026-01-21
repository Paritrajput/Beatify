import { NextResponse } from "next/server";
import dbConnect from "@/Utilities/db";
import { Artist } from "@/Models/artist.model";

export const POST = async (req) => {
  try {
    await dbConnect();

    const { artistId, songIds } = await req.json(); // songIds is an array

    if (!artistId || !Array.isArray(songIds)) {
      return NextResponse.json(
        { error: "Artist ID and song IDs are required." },
        { status: 400 }
      );
    }

    // Add the new songs to the artist's songs array
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      { $addToSet: { songs: { $each: songIds } } }, // Prevent duplicates
      { new: true } // Return updated artist document
    ).populate("songs"); // Populate songs for client-side convenience

    if (!updatedArtist) {
      return NextResponse.json({ error: "Artist not found." }, { status: 404 });
    }

    return NextResponse.json({ artist: updatedArtist }, { status: 200 });
  } catch (error) {
    console.error("Error updating artist songs:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
};
