import express from "express";
import ReviewController from "../controllers/ReviewController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

  router.get(
    "/:id",
    ReviewController.getReview
  );

  router.get(
    "/",   
    ReviewController.getReviews
  );

  router.get(
    "/restaurant/:id",
    ReviewController.getReviewsByRestaurant
  );

  router.delete(
    "/delete/:id",
    jwtCheck, jwtParse,
    ReviewController.deleteReview
  );

  router.post(
    "/restaurants/:id",
    jwtCheck, jwtParse,
    ReviewController.comment
  );

  router.post(
    "/reply/:id",
    jwtCheck, jwtParse,
    ReviewController.reply
  );

export default router;
