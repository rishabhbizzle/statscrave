import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

let cached = global._mongoose;

if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

export async function connect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGO_URI, { dbName: 'prod' })
            .then((m) => {
                console.log('MongoDB connected successfully');
                return m;
            })
            .catch((err) => {
                cached.promise = null;
                console.error('MongoDB connection error:', err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
