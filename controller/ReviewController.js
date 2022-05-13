const Review = require("../model/Review");

exports.createReview = async (request, response) => {
    try {
        request.body.idUser = request.body.payload.id;
        const review = await Review.create(request.body);
        response.status(201).json(review);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.getReviews = async (request, response) => {
    try {
        let reviews = await Review.find().sort({ nbrLikes: -1 });
        response.json(reviews);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.getReviewsOwnedByUser = async (request, response) => {
    try {
        let userReviews = await Review.find().where("idUser").equals(request.payload.id);
        response.json(userReviews);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.getReviewById = async (request, response) => {
    try {
        let reviewById = await Review.findById(request.params.id);
        if (reviewById) {
            response.json(reviewById);
        } else {
            response.status(404).json("This review does not exist!");
        }
    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.updateReview = async (request, response) => {
    try {
        let review = await Review.findById(request.params.id);
        if (!review) {
            return response.json("This review does not exist!");
        }
        if (review.idUser != request.payload.id) {
            return response.json("You dont have the permissions to update this review!");
        }
        review.title = request.body.title;
        review.content = request.body.content;
        review.nbrLikes = request.body.nbrLikes;
        await review.save();
        response.json(review);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.deleteReview = async (request, response) => {
    try {
        let review = await Review.findById(request.params.id);
        if (!review) {
            return response.json("This review does not exist!");
        }
        if (review.idUser != request.payload.id) {
            return response.json("You dont have the permissions to delete this review!");
        }
        await review.removed();
        response.json(review);
    } catch (error) {
        response.status(500).json(error.message);
    }
};