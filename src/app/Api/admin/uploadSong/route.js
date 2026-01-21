import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import Song from "@/Models/song.model";
import dbConnect from "@/Utilities/db";

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
    const coverImg = formData.get("coverImg");
    const audioFile = formData.get("audioFile");
    const title = formData.get("title");
    const artists = formData.get("artists");

    // Debugging: Log received fields and files
    console.log("Received formData fields:");
    console.log({ title, artists });
    console.log("Received coverImg:", coverImg);
    console.log("Received audioFile:", audioFile);

    // Validation
    if (!title || !artists || !coverImg || !audioFile) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, artists, cover image, or audio file.",
        },
        { status: 400 }
      );
    }

    // Upload files to Cloudinary
    const coverImgResult = await uploadFileToCloudinary(
      coverImg,
      "music_app/songs/CoverImages"
    );
    const audioFileResult = await uploadFileToCloudinary(
      audioFile,
      "music_app/songs/AudioFiles"
    );

    console.log(audioFileResult.duration);

    // Save metadata in MongoDB
    const newSong = new Song({
      title,
      artists,
      coverImg: coverImgResult.secure_url,
      link: audioFileResult.secure_url,
      duration: audioFileResult.duration,
    });
    await newSong.save();

    return NextResponse.json(
      { message: "Song uploaded successfully", song: newSong },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading song:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
