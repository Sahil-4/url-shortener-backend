import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./Database/index.js";
import urlRoutes from "./Routes/url.routes.js";
import authRoutes from "./Routes/auth.routes.js";

const app = express();

// configuration 
dotenv.config();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// urls routes
app.use("/api/v1/url", urlRoutes);

// authentication routes
app.use("/api/v1/auth", authRoutes);

// connect to database 
// and start the server 
try {
  connectDatabase();
  app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log("Server is up and running");
  });
} catch (error) {
  console.log(error);
}
