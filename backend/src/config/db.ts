import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const connectDB = async () => {
  const dbUser = encodeURIComponent(process.env.MONGO_USER || ""); // URL encode in case of special chars
  const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD || "");
  const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/final-web";

  // If authentication is needed, modify the URI to include credentials
  const authURI = dbUser && dbPassword
    ? dbURI.replace("mongodb://", `mongodb://${dbUser}:${dbPassword}@`)
    : dbURI;

  console.log("Connecting to MongoDB...");

  try {
    await mongoose.connect(authURI, {
      family: 4,
      authSource: "admin", // Ensure this matches your MongoDB setup
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
