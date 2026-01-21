import mongoose from "mongoose";

const myPlaylistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
const myPlaylist =
  mongoose.models.myPlaylist || mongoose.model("myPlaylist", myPlaylistSchema);
export { myPlaylist };
