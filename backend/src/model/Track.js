
import mongoose from 'mongoose';

const TracksSchema = new mongoose.Schema({
    spotifyTrackId: String,
    name: String,
    artists: [String],
    genres: [String], // derived, not direct
    popularity: Number,
    durationMs: Number,
    explicit: Boolean,
    audioFeatures: {
        energy: Number,
        valence: Number,
        danceability: Number,
        tempo: Number
    }
})

export default mongoose.model("Tracks", TracksSchema);