import mongoose from 'mongoose';

// Define the type for the cached connection
type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

// Initialize the cached connection
let cached: MongooseConnection = (global as typeof globalThis & {
  mongoose: MongooseConnection;
}).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & {
    mongoose: MongooseConnection;
  }).mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB
async function connect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new database connection');
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log('Database connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    cached.promise = null; // Reset the promise to allow retries
    throw error;
  }

  return cached.conn;
}

export default connect;