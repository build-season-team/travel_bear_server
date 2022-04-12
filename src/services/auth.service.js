const jwt = require("jsonwebtoken");
const User = require("./../models/user.model");
const AppError = require("./../utils/appError");


  const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  const createSendToken = (user) => {
    const token = signToken(user);

    user.password = undefined;

    return {
      status: "success",
      token,
      data: {
        user: user,
      },
    };
  }

  exports.signUp = async (data, next) => {
    let oldUser = await User.findOne({ email: data.email });
    if (oldUser) next(new AppError("Email already exists", 400));
    const newUser = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    return createSendToken(newUser);
  }


