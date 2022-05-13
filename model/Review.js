const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        nbrLikes: { type: Number, default: 0 },
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Publication = mongoose.model("Review", reviewsSchema);
module.exports = Publication;