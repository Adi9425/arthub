import Artwork from "../models/artwork.js";
import User from "../models/artists.js"; // adjust path if needed

export const createArtwork = async (req, res) => {
  try {
    const { title, description, price, image, medium, style, userId } = req.body;

    // 1. Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Create the artwork
    const newArtwork = new Artwork({
      title,
      description,
      price,
      image,
      medium,
      style,
      userId: user._id,
      userName: user.username, // storing user's username
    });

    await newArtwork.save();

    // 3. Respond with the created artwork
    res.status(201).json({
      message: "Artwork registered successfully",
      artwork: newArtwork,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
