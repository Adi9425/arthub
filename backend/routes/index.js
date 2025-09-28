import express from "express";
import authRoutes from "./auth.js";
import artistsRoutes from "./artists.js";
import artwork from "./artwork.js";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/artists", artistsRoutes);
router.use("/artworks",artwork);

export default router;