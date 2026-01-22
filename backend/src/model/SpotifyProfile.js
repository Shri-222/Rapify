
import mongoose from 'mongoose';

export const SpotifyProfile = new mongoose.Schema({
    userId: ObjectId,
    spotifyUserId: String,
    displayName: String,
    country: String,
    followers: Number,
    accountType: String, // free / premium
    createdAt: Date
})