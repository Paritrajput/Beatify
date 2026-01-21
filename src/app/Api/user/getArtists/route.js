import { NextResponse } from "next/server";
import dbConnect from "@/Utilities/db";
import { Artist } from "@/Models/artist.model";

export const GET = async () => {
  try {
    await dbConnect();

    const artists = await Artist.find();

    return NextResponse.json({ artists }, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
