const Reviews = require("../models/review");

exports.createReview = async (req, res, next) => {
  const {review,rating,apartment,userId} = req.body;

  if(!review){
    return res.status(400).json({
      success: false,
      message: "Review is required"
    });
  }
  if(!rating){
    return res.status(400).json({
      success: false,
      message: "Rating is required"
    });
  }
  if(!apartment){
    return res.status(400).json({
      success: false,
      message: "Apartment is required"
    });
  }
  if(!userId){
    return res.status(400).json({
      success: false,
      message: "User is required"
    });
  }
  const singleReview = new Reviews({
    user: req.body.user,
    apartment: req.body.apartment,
    review: req.body.review,
    rating: req.body.rating,
  });

  const savedReview = await singleReview.save();

  return res.status(201).json({
    success: true,
    message: "Review created",
    data: savedReview
  });
};

exports.getOneReviews = async (req, res, next) => {
  try{
    const review =  await Reviews.findById(req.params.id).populate("user").populate("apartment");
    return res.status(200).json({
      success: true,
      message: "Review found",
      data: review
    });
  } catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllReviews = async (req, res, next) => {
  try{
    const reviews =  await Reviews.find().populate("user").populate("apartment");
    return res.status(200).json({
      success: true,
      message: "Reviews found",
      data: reviews
    });
  } catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};