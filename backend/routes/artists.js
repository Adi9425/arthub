import express from "express";
import {artistSignup} from "../controllers/artistscontroller.js";
import {getArtworksByUser} from "../controllers/artistsInventory.js"
// import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/profile",artistSignup);
router.get("/inventory",getArtworksByUser);

export default router;