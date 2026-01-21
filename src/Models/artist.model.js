import mongoose from "mongoose";
import Song from "./song.model";

// Define the Artist Schema
const artistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Song document
        ref: "Song",
        required: true,
      },
    ],
    duration: Number,
    songNumber: Number,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Artist model
const Artist = mongoose.models.Artist || mongoose.model("Artist", artistSchema);
export { Artist };
