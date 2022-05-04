const Bank = require('../models/bank.model')
const catchAsync = require('../utils/catchAsync')

exports.addBank = catchAsync(async (req, res, next) => {
    const bank = await Bank.create(req.body);
    res.status(201).json({
      status: "success",
      message: "bank added successfully",
      data: {
        data: bank,
      },
    });
})

exports.deleteBank = catchAsync(async (req, res, next) => {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "bank deleted successfully"
    });
})