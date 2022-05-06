const axios = require('axios')
const { createTransactionID } = require('../utils/helper')
const Flutterwave = require("flutterwave-node-v3");
const Transaction = require("../models/transaction.model");
const Booking = require('../models/booking.model');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const Email = require('../utils/email');
const Apartment = require('../models/apartment.model')



exports.getPaymentLink = async (req, res, next) => {
    const {owner, amount, email, phone, name, title, image, user_id, apartment_id} = req.body;
    const ref = createTransactionID();
    Transaction.create({
        user: user_id,
        amount: amount,
        ref: ref,
        type: 'payment',
        receiver: owner
    });
    try {
        const response = await axios.post(
          "https://api.flutterwave.com/v3/payments",
          {
            tx_ref: ref,
            amount: amount,
            currency: "NGN",
            redirect_url: "https://travelbearz.herokuapp.com/api/booking/verify",
            meta: {
              userID: user_id,
              apartmentID: apartment_id,
              owner: owner
            },
            customer: {
              email: email,
              phonenumber: phone,
              name: name,
            },
            customizations: {
              title: title,
              logo: image,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
          }
        );

        res.status(200).json({
            link: response.data.data.link 
        }
            )
    } catch (err) {
        console.log(err.response);
        res.status(400).json({
          status: "failed",
          message: "link not aquired",
          data: {
            data: err.response.data
          },
        });
    }
}

exports.verify = catchAsync( async (req, res, next) => {
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    if (req.query.status === 'successful') {
        const transactionDetails = await Transaction.findOne({ref: req.query.tx_ref});
        const response = await flw.Transaction.verify({id: req.query.transaction_id});
        if (response.data.status === "successful" && response.data.amount == transactionDetails.amount && response.data.currency === "NGN") {
            const receiver = await User.findById(response.data.meta.userID)
            const user = await User.findById(response.data.meta.owner)
            await User.findByIdAndUpdate(user._id, {balance: user.balance + (response.data.amount * 0.9)})
            await Transaction.findOneAndUpdate({ ref: req.query.tx_ref },{ status: "successful" },{new: true,runValidators: true});
            await Apartment.findByIdAndUpdate(response.data.meta.apartmentID, {isOccupied: true, $inc: {visited: 1}}, {new: true,runValidators: true});
            await Booking.create({
              user: response.data.meta.userID,
              apartment: response.data.meta.apartmentID,
              amount: response.data.amount,
              reference: req.query.tx_ref
            });
            await new Email(receiver, user.phone).sendBooking()
            res.redirect('http://localhost:3000/reservation?success=true')
        } else {
            // Inform the customer their payment was unsuccessful
            
            next();
        }
    }
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({user: req.user.id}).populate("apartment");

  res.status(200).json({
    status: "success",
    data: bookings
  })
  
  
})