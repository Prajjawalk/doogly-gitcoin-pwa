// @ts-nocheck
import mongoose from "mongoose";

if (!process.env.NEXT_ATLAS_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.NEXT_ATLAS_URI;

// Connect to MongoDB using Mongoose
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the connection
  let globalWithMongo = global as typeof globalThis & {
    _mongooseClient?: typeof mongoose;
  };

  if (!globalWithMongo._mongooseClient) {
    globalWithMongo._mongooseClient = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "gitcoinprojects",
    });
  }
} else {
  // In production mode, connect directly
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "gitcoinprojects",
  });
}

// Export the Mongoose client
export default mongoose;
