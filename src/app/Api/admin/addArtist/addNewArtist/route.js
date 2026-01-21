import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import dbConnect from "@/Utilities/db";
import { Playlist } from "@/Models/playlist.model";
import { Artist } from "@/Models/artist.model";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload files to Cloudinary
const uploadFileToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    file
      .arrayBuffer()
      .then((buffer) => {
        const bytes = Buffer.from(new Uint8Array(buffer));
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto", folder },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            resolve(result);
          }
        );
        uploadStream.end(bytes);
      })
      .catch((err) => {
        console.error("Error converting file to buffer:", err);
        reject(err);
      });
  });
};

// API Route
export const POST = async (req) => {
  try {
    await dbConnect();

    const formData = await req.formData();
    const title = formData.get("title");
    const coverImg = formData.get("coverImg");
    const songIds = JSON.parse(formData.get("songIds")); // Parse JSON string to array
    const songNumber = formData.get("songNumber"); // Convert to number
    const duration = formData.get("duration");

    console.log("Received formData fields:");
    console.log({ title, songNumber });
    console.log("Received coverImg:", coverImg);
    console.log("Received songIds:", songIds);
    console.log("Received duration:", duration);

    // Validation

    if (!title)
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );

    if (!coverImg)
      return NextResponse.json(
        { error: "Cover image is required." },
        { status: 400 }
      );
    if (!songIds)
      return NextResponse.json(
        { error: "Song IDs are required." },
        { status: 400 }
      );
    if (!songNumber)
      return NextResponse.json(
        { error: "Song number is required." },
        { status: 400 }
      );
    if (!duration)
      return NextResponse.json(
        { error: "Duration is required." },
        { status: 400 }
      );

    const artistExist = await Artist.findOne({ title });
    if (artistExist) {
      return NextResponse.json({ massage: "Artist already exist" });
    }

    // Upload files to Cloudinary

    const coverImgResult = await uploadFileToCloudinary(
      coverImg,
      "music_app/Artists/CoverImages"
    );

    console.log(coverImgResult.secure_url);

    // Save metadata in MongoDB
    const newArtist = new Artist({
      title,
      coverImg: coverImgResult.secure_url,
      songs: songIds,
      songNumber,
      duration,
    });
    await newArtist.save();

    return NextResponse.json(
      { message: "Artist uploaded successfully", Playlist: newArtist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading Artist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
