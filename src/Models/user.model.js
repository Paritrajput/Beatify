import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String, // Corrected from "String"
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String, // Corrected from "String"
      required: true,
      lowercase: true,
    },
    password: {
      type: String, // Corrected from "String"
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
