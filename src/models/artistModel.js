import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        unique: true,
        required: [true, "Please provide a artist id"],
    },
    image:{
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
    },
    followers: {
        type: Number,
    },
    popularity: {
        type: Number,
    },
    genres: {
        type: Array,
        default: [],
    },
    totalStreams: {
        type: Number,
    },
    leadStreams: {
        type: Number,
    },
    soloStreams: {
        type: Number,
    },
    featureStreams: {
        type: Number,
    },
    dailyTotalStreams: {
        type: Object,
        default: {},
    },
    dailyLeadStreams: {
        type: Object,
        default: {},
    },
    dailyFeatureStreams: {
        type: Object,
        default: {},
    },
    dailySoloStreams: {
        type: Object,
        default: {},
    },

}, {
    timestamps: true
}
)

const Artist = mongoose.models.artists || mongoose.model("artists", artistSchema);

export default Artist;