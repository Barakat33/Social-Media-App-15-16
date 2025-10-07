import mongoose from "mongoose";
import { devConfig } from "../config/env/dev.config.js";

export const connectDB = async () => {
  try {
    if (!devConfig.DB_URL) {
      throw new Error("❌ DB_URL is not defined in environment variables");
    }
    await mongoose.connect(devConfig.DB_URL);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};
