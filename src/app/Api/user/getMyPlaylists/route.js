import { NextResponse } from "next/server";
import dbConnect from "@/Utilities/db";
import { myPlaylist } from "@/Models/myPlaylist.model";
import { verifyJWT } from "@/Utilities/jwt";

export const GET = async (req) => {
  try {
    await dbConnect();

    /* ---------------- VERIFY USER ---------------- */
    let userId;
    try {
      const { userId: id } = await verifyJWT(req);
      userId = id;
    } catch (error) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* ---------------- FETCH PLAYLISTS ---------------- */
    const playlists = await myPlaylist
      .find({ user: userId })
      .populate("songs") // remove this if not needed
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { playlists },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching playlists:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
