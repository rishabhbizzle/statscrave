import mongoose, { Schema } from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist"
    },
    totalStreams: {
        type: Number,
        default: 0,
    },
    dailyStreams: {
        type: Object,
        default: {},
    },
})

const Album = mongoose.models.albums || mongoose.model("albums", albumSchema);

export default Album;