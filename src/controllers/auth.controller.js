const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/user.model");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.register = catchAsync ( async (req, res, next) => {
  const data = req.body;
  let oldUser = await User.findOne({ email: data.email });

  // if (oldUser) return next(new AppError("Email already exists", 400));
  if(oldUser) res.status(400).json({
    status: "failed",
    message: "Email already exists",
  });

  const newUser = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: data.role,
  });

   createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1 check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  //2 check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  console.log(user)

  // 3 Send token
   createSendToken(user, 201, req, res);
  // });
});

exports.getme = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  res.status(200).json({
    status: "success",
      message: "Withdrawal Request successfully, please await verification",
      data: user,
  })
})