import express from "express";
import {createArtwork} from "../controllers/artwork.js";
import {getAllArtworks} from "../controllers/artworkSerch.js"
// import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/",createArtwork);
router.get("/search",getAllArtworks);

export default router;