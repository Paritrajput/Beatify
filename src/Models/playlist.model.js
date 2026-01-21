import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    artists: [
      {
        type: String,
        required: true,
      },
    ],
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: true,
      },
    ],
    songNumber: Number,
    duration: Number,
  },
  {
    timestamps: true,
  }
);

// Create the Playlist model
const Playlist =
  mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);
export { Playlist };
