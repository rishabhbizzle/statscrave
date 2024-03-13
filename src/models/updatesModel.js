import mongoose, { Schema } from "mongoose";

// Define the schema for the blogs
const updatesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    author: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
    },
    pin : {
        type: Boolean,
        default: false
    },
    author: {
        type: String,
    },
}, {
    timestamps: true
}

);

// Defined the model for blog
const Updates = mongoose.models.updates  || mongoose.model("updates", updatesSchema);

export default Updates

