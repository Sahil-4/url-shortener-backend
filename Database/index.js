import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("Database is connected");
    console.log(`Database Host : ${connection.connections[0].host}`);
    console.log(`Database Port : ${connection.connections[0].port}`);
    console.log(`Database Name : ${connection.connections[0].name}`);
  } catch (error) {
    throw error;
  }
};
