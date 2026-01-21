import { NextResponse } from "next/server";

import dbConnect from "@/Utilities/db";
import { Artist } from "@/Models/artist.model";
import Song from "@/Models/song.model";

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
    const Artists = await Artist.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    });

    const enrichedArtists = await Promise.all(
      Artists.map(async (artist) => {
        const songIds = artist.songs || [];
        const artistSongs = await Song.find({ _id: { $in: songIds } });
        return {
          _id: artist._id,
          title: artist.title,
          coverImg: artist.coverImg,
          songNumber: artist.songNumber,
          songs: artistSongs, // Add the fetched songs here
          songIds,
        };
      })
    );

    return NextResponse.json({ enrichedArtists }, { status: 200 });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
};
