
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createTransactionID } = require("../utils/helper");


exports.createTranscaction = catchAsync(async (req, res, next) => {
    req.body.ref = createTransactionID()
    req.body.user = req.user._id;
    req.body.type = "withdrawal";
    const user = await User.findById(req.user._id)
    if(req.body.amount > user.balance) return next(new AppError("You must withdraw money within your balance", 400));
    await User.findByIdAndUpdate(user._id, {balance: user.balance - req.body.amount},{ new: true,runValidators: true});
    const transaction = await Transaction.create(req.body)
    res.status(201).json({
      status: "success",
      message: "Withdrawal Request successfully, please await verification",
      data: transaction,
    });
})