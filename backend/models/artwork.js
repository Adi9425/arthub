import mongoose from "mongoose";
import { type } from "os";

const ArtworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "available"
    }
}, { timestamps: true });

const Artwork = mongoose.model("Artwork", ArtworkSchema);

export default Artwork;
