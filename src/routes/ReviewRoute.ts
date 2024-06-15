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

  router.post(
    "/:id",
    ReviewController.comment
  );

  router.patch(
    "/update/:id",
    ReviewController.editReview
  );

  router.delete(
    "/delete/:id",
    ReviewController.deleteReview
  );

export default router;
