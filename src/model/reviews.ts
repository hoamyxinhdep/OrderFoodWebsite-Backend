import mongoose from "mongoose";
import { Schema } from 'mongoose';

const replySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  comment: String,
  replies: [replySchema],
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
