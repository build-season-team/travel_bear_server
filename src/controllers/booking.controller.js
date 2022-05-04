const axios = require('axios')
const { createTransactionID } = require('../utils/helper')
const Flutterwave = require("flutterwave-node-v3");
const Transaction = require("../models/transaction.model");
const Booking = require('../models/booking.model');
const catchAsync = require('../utils/catchAsync');



exports.getPaymentLink = async (req, res, next) => {
    const {amount, email, phone, name, title, image, user_id, apartment_id} = req.body;
    const ref = createTransactionID();
    Transaction.create({
        user: user_id,
        amount: amount,
        ref: ref,
        type: 'payment'
    });
    try {
        const response = await axios.post(
          "https://api.flutterwave.com/v3/payments",
          {
            tx_ref: ref,
            amount: amount,
            currency: "NGN",
            redirect_url: "http://localhost:8001/api/booking/verify",
            meta: {
              userID: user_id,
              apartmentID: apartment_id,
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
            //   "Access-Control-Allow-Origin": "*",
            },
          }
        );

        res.status(200).json({
            link: response.data.data.link
        }
            )
    } catch (err) {
        // console.log(err);
        res.status(400).json({
          status: "failed",
          message: "link not aquired",
          data: {
            data: err.response.data,
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
            console.log('in here')
            await Transaction.findOneAndUpdate({ ref: req.query.tx_ref },{ status: "successful" },{new: true,runValidators: true,});
            await Booking.create({
              user: response.data.meta.userID,
              apartment: response.data.meta.apartmentID,
              amount: response.data.amount,
              reference: req.query.tx_ref
            });
            res.redirect('http://localhost:3000/reservation?success=true')
        } else {
            // Inform the customer their payment was unsuccessful
            
            next();
        }
    }
});