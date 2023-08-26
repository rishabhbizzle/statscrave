import mongoose, { Schema } from "mongoose";

const songSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        unique: true,
        required: [true, "Please provide a song id"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
    },
    artistSpotifyId: {
        type: String,
        ref: "artists",
    },
    totalStreams: {
        type: Number,
        default: 0,
    },
    dailyStreams: {
        type: Object,
        default: {},
    },

}, {
    timestamps: true
}
)

const Song = mongoose.models.songs || mongoose.model("songs", songSchema);

export default Song;