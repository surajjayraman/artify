import mongoose from "mongoose";
// const mongoose = require("mongoose");

let isConnected = false; // Track the connection

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected successfully!");
    return;
  }
  // use new database connection
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGODB_DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};
