import mongoose from "mongoose";

const priorityArtistSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        unique: true,
        required: [true, "Please provide a artist id"],
    },
}, {
    timestamps: true
}
)

const PriorityArtist = mongoose.models.priorityArtists || mongoose.model("priorityArtists", priorityArtistSchema);

export default PriorityArtist;