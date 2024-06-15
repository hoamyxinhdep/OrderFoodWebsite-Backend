import { Schema } from 'mongoose';
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema( {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurant:{
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      require: true,
    },
    comment: String,
    reply: String,
  },
  { timestamps: true },);

const Review = mongoose.model("Review", reviewSchema);
export default Review;