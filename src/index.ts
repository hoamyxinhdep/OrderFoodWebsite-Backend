import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRouter from "./routes/MyUserRoutes";
import myRestaurantRouter from "./routes/MyRestaurantRoute";
import restaurantRouter from "./routes/RestaurantRoute";
import reviewRoute from "./routes/ReviewRoute";
import { v2 as cloudinary } from "cloudinary";
import orderRouter from "./routes/OrderRoute";
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Server is running" });
});
app.use("/api/my/user", myUserRouter);
app.use("/api/my/restaurant", myRestaurantRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRoute);
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
