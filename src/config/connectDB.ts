import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edupay';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

// Extend the NodeJS global object with a mongoose property
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB
