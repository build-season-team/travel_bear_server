const router = require("express").Router();
const Review = require("../controllers/review.controller");
const {protect} = require("../middlewares/auth.middleware");

router.post("createReview", protect, Review.createReview);
router.get("viewOneReviews", Review.getOneReviews);
router.get("viewAllReviews", Review.getAllReviews);

module.exports = router;