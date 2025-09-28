import Artwork from "../models/artwork.js";

export const getArtworksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const artworks = await Artwork.find(
      { userId },
      "title description price image status"
    );

    if (!artworks || artworks.length === 0) {
      return res.status(404).json({ message: "No artworks found for this user" });
    }

    res.status(200).json(artworks);
  } catch (err) {
    console.error("Error fetching artworks:", err);
    res.status(500).json({ message: "Server error" });
  }
};
