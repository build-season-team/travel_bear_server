const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const User = require("../models/user.model");
// const crypto = require("crypto");


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } 
  // console.log(token);
  if (!token) {
    return next(
      new AppError("You are not logged in, please log in to get access", 401)
      );
    }
    // 2)Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log("=================================");
    console.log(decoded);

  // 3) check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("The user does no longer exists", 401));
  }

  // 4) check if user change password after token issue
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password please log in again", 401)
    );
  }

  // Grant Access to protected route
  req.user = freshUser;
  res.locals.user = freshUser;
  // console.log(req.user);
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles [admin, landlord, user].
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
