import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    portfolio: {
      type: String, // URL of portfolio
      default: "",
      trim: true,
    },
    socialLinks: {
      type: [String], // Array of social media links
      default: [],
    },
    profilePicture: {
      type: String, // Base64 string
      default: "",
    },
  },
  { timestamps: true }
);

// Fix for OverwriteModelError
const Artist = mongoose.models.Artist || mongoose.model("Artist", artistSchema);

export default Artist;
