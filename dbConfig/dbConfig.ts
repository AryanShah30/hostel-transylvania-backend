import mongoose from "mongoose";

export async function connect() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in environment variables");
  }

  if (mongoose.connection.readyState === 1) {
    // Already connected
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);  // Use await
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error: ", err);
      process.exit(1); // Gracefully exit
    });
  } catch (error: any) {
    console.error("Something went wrong connecting to MongoDB!", error);
    throw new Error(error);
  }
}
