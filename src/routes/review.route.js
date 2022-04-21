const router = require("express").Router();
const Review = require("../controllers/review.controller");

router.post("createReview", Review.createReview);
router.post("viewOneReviews", Review.getOneReviews);
router.post("viewAllReviews", Review.getAllReviews);

module.exports = router;