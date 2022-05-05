const Bank = require('../models/bank.model')
const catchAsync = require('../utils/catchAsync')

exports.addBank = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id
    const bank = await Bank.create(req.body);

    res.status(201).json({
      status: "success",
      message: "bank added successfully",
      data: {
        data: bank,
      },
    });
})

exports.getBank = catchAsync(async (req, res, next) => {
  user = req.user._id;
  const bank = await Bank.find({user: user});

  res.status(201).json({
    status: "success",
    message: "bank added successfully",
    data: {
      data: bank,
    },
  });
});


exports.deleteBank = catchAsync(async (req, res, next) => {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "bank deleted successfully"
    });
})