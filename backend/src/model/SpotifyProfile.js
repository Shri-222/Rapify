
import mongoose from 'mongoose';

const SpotifyProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    spotifyUserId: String,
    displayName: String,
    country: String,
    followers: Number,
    accountType: String, // free / premium
    createdAt: Date
})

export default mongoose.model("SpotifyProfile", SpotifyProfileSchema);