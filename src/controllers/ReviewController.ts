import { Request, Response } from "express";
import Review from "../model/reviews";
import Restaurant from "../model/restaurant";

const getReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.findById({_id: req.params.id}).populate('user');
        
        if (!review) {
            return res.status(404).json({ message: "review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Error fetching review" });
    }
};

const getReviews = async (req: Request, res: Response) => {
    try{
        const reviews = await Review.find().populate('user');
        if (!reviews) {
            return res.status(404).json({ message: "reviews not found" });
        }
        res.status(200).json(reviews);
    }catch (error) {
    res.status(500).json({ message: "Error fetching review" });
    }
};

const getReviewsByRestaurant = async (req: Request, res: Response) => {
    try{
        const reviews = await Review.find({ restaurant: req.params.id }).populate('user');
        if (!reviews) {
            return res.status(404).json({ message: "reviews not found" });
        }
        res.status(200).json(reviews);
    }catch (error) {
    res.status(500).json({ message: "Error fetching review" });
    }
};

const comment = async (req: Request, res: Response) => {
    const id = req.userId;
    const newReview = new Review({user: id, restaurant: req.params.id, ...req.body }, );
    try{
        const review = await newReview.save();
        res.status(201).json(review);
    }catch (error) {
        res.status(500).json({ message: "Error fetching review" });
    }
};

const editReview = async (req: Request, res: Response) => {
    console.log(req.params.id)
    const { comment } = req.body;
    const userId = req.userId;
    try{
        const review = await Review.findById(req.params.id);

        if (!review) {
        res.status(404).json({ error: 'Review not found' });
        return;
        }

        if (review.user.toString() !== userId) {
        res.status(403).json({ error: 'You are not authorized to edit this review' });
        return;
        }
        review.comment = comment;
        res.status(200).json(review);
    }catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteReview = async (req: Request, res: Response) => {
    const userId = req.userId;

    try{
        const review = await Review.findById(req.params.id);

        if (!review) {
          res.status(404).json({ error: 'Review not found' });
          return;
        }
    
        if (review.user.toString() !== userId) {
          res.status(403).json({ error: 'You are not authorized to delete this review' });
          return;
        }
    
        await Review.findByIdAndDelete(req.params.id);
    
        res.status(200).json({ message: 'Review deleted successfully' });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const reply = async (req: Request, res: Response) => {

    const userId = req.userId; 
    const { reply } = req.body;

    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
          res.status(404).json({ error: 'Review not found' });
          return;
        }
        if (!review.restaurant) {
            return res.status(400).json({ message: "Review is not associated with any restaurant" });
        }
        const restaurant = await Restaurant.findById(review.restaurant._id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        if (!restaurant.user) {
            return res.status(400).json({ message: "User is not associated with any restaurant" });
        }
        if (restaurant.user.toString() !== userId) {
            res.status(403).json({ error: 'You are not authorized to reply this review' });
            return;
          }
        review.reply = reply;
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Error replying to review", error });
    }
};

export default { getReview, getReviews, comment,  editReview, deleteReview, getReviewsByRestaurant, reply };

