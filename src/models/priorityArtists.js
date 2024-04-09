import mongoose from "mongoose";

const priorityArtistSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        unique: true,
        required: [true, "Please provide a artist id"],
    },
    cmId: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true
}
)

const PriorityArtist = mongoose.models.priorityArtists || mongoose.model("priorityArtists", priorityArtistSchema);

export default PriorityArtist;