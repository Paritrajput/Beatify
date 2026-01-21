import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/Utilities/db";
import { myPlaylist } from "@/Models/myPlaylist.model";
import { verifyJWT } from "@/Utilities/jwt";

/* ---------------- Cloudinary Config ---------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------- Upload Helper ---------------- */
const uploadFileToCloudinary = async (file, folder) => {
  if (!file) throw new Error("No file provided");

  let buffer;

  if (typeof file.arrayBuffer === "function") {
    buffer = Buffer.from(await file.arrayBuffer());
  } else if (typeof file.stream === "function") {
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    buffer = Buffer.concat(chunks);
  } else {
    throw new Error("Unsupported file type");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

/* ---------------- API Route ---------------- */
export const POST = async (req) => {
  try {
    await dbConnect();

    /* 🔐 Verify user */
    let userId;
    try {
      const { userId: id } = await verifyJWT(req);
      userId = id;
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const title = formData.get("title")?.trim();
    const artists = JSON.parse(formData.get("artists") || "[]");
    const coverImg = formData.get("coverImg"); // File OR string
    const songIds = JSON.parse(formData.get("songIds") || "[]");
    const duration = Number(formData.get("duration"));

    /* ---------------- Validation ---------------- */
    if (!title)
      return NextResponse.json({ error: "Title is required" }, { status: 400 });

    if (!Array.isArray(artists) || artists.length === 0)
      return NextResponse.json({ error: "Artists are required" }, { status: 400 });

    if (!Array.isArray(songIds) || songIds.length === 0)
      return NextResponse.json(
        { error: "Playlist must contain songs" },
        { status: 400 }
      );

    if (Number.isNaN(duration) || duration <= 0)
      return NextResponse.json(
        { error: "Invalid duration" },
        { status: 400 }
      );

    /* ---------------- Cover Image Handling ---------------- */
    let coverImgUrl;

    // ✅ Case 1: User did NOT upload → default image URL
    if (typeof coverImg === "string") {
      coverImgUrl = coverImg;
    }
    // ✅ Case 2: User uploaded file → upload to Cloudinary
    else {
      const uploadResult = await uploadFileToCloudinary(
        coverImg,
        "music_app/myPlaylists/CoverImages"
      );
      coverImgUrl = uploadResult.secure_url;
    }

    /* ---------------- Save Playlist ---------------- */
    const newPlaylist = await myPlaylist.create({
      user: userId,
      title,
      artists,
      coverImg: coverImgUrl,
      songs: songIds,
      songNumber: songIds.length,
      duration,
    });

    return NextResponse.json(
      {
        message: "Playlist created successfully",
        playlist: newPlaylist,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Playlist creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
