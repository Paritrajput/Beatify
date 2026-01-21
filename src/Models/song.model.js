import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    artists: {
      type: String,
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Song = mongoose.models.Song || mongoose.model("Song", songSchema);
export default Song;
