import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edupay';

if(!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

//   Check if the connection is already established
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;


export const disconnectDB = async () => {
  if (cached.conn) {
    await cached.conn.close();
    cached.conn = null;
  }
}

export const isConnected = () => {
  return cached.conn && cached.conn.readyState === 1;
};


export const connectDBWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      await connectDB();
      console.log('MongoDB connected');
      break;
    } catch (err) {
      console.error(err);
      retries -= 1;
      console.log(`Retrying to connect to MongoDB... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}