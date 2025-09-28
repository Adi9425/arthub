import express from "express";
import {artistSignup} from "../controllers/artistscontroller.js";
// import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/profile",artistSignup);

export default router;