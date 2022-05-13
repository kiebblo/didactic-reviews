const express = require("express");
const router = express.Router();
const ReviewController = require("../controller/ReviewController");
const auth = require("../middleware/auth");

router.post("/", auth, ReviewController.createReview);
router.get("/", ReviewController.getReviews);
router.get("/reviewsbyuser", auth, ReviewController.getReviewsOwnedByUser);
router.get("/:id", ReviewController.getReviewById);
router.put("/:id", auth, ReviewController.updateReview);
router.delete("/:id", auth, ReviewController.deleteReview);

module.exports = router;