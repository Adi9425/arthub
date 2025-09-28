import Artwork from "../models/artwork.js";
import Artist from "../models/artists.js"; // previously User

export const getAllArtworks = async (req, res) => {
  try {
    const { medium, style, price_min, price_max } = req.query;

    // Build filter dynamically
    let filter = {};
    if (medium) filter.medium = medium;
    if (style) filter.style = style;
    if (price_min || price_max) {
      filter.price = {};
      if (price_min) filter.price.$gte = Number(price_min);
      if (price_max) filter.price.$lte = Number(price_max);
    }

    // Fetch artworks and populate artist's username
    const artworks = await Artwork.find(filter);

    if (!artworks || artworks.length === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }

    // Map to requested response format
    const response = artworks.map(art => ({
      title: art.title,
      artist: art.userName,
      artistId:art.userId, // show artist's name
      description: art.description,
      price: art.price,
      image: art.image,
      medium: art.medium,
      style: art.style
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
