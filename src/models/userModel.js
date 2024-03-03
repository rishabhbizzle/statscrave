import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const userFavoriteSchema = new mongoose.Schema({
    kindeId: {
        type: String,
        required: [true, "Please provide a user id"],
    },
    type: { 
        type: String,
        enum: ['artist', 'album', 'track'] 
    },
    spotifyId: { 
        type: String,
        required: [true, "Please provide a spotify id"],
    },
    image: { 
        type: String,
    },
    name: { 
        type: String,
        required: [true, "Please provide a name"],
    },
});



const User = mongoose.models.users || mongoose.model("users", userSchema);

const UserFavorite = mongoose.models.userFavorites || mongoose.model("userFavorites", userFavoriteSchema);

export  { User, UserFavorite };