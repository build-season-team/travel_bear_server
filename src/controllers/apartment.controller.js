const Apartment = require("../models/apartment.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const checks = require("../utils/checks");

// create an apartment
exports.register = catchAsync(async (req, res, next) => {
  try {
    const allImages = req.files;
    const {
      houseTitle,
      description,
      houseRules,
      amount,
      address,
      city,
      state,
      roomCondition
    } = req.body;

    if (!houseTitle) {
      return res.status(400).send({
        success: false,
        message: "House title is required"
      });
    }
    if (!description) {
      return res.status(400).send({
        success: false,
        message: "House description is required"
      });
    }
    if (!houseRules) {
      return res.status(400).send({
        success: false,
        message: "Description is required"
      });
    }
    if (!amount) {
      return res.status(400).send({
        success: false,
        message: "amount is required"
      });
    }
    if (!address) {
      return res.status(400).send({
        success: false,
        message: "address of the house is required"
      });
    }
    if (!city) {
      return res.status(400).send({
        success: false,
        message: "city is not provided"
      });
    }
    if (!state) {
      return res.status(400).send({
        success: false,
        message: "state is not provided"
      });
    }
    if (!roomCondition) {
      return res.status(400).send({
        success: false,
        message: "room condition is not specified"
      });
    }
    //  check if 5 pictures are uploaded
    if (allImages.length !== 5) {
      res.status(400).send({
        message: "please upload 5 pictures of your apartment",
      });
    } else {
      let apartmentImages = [];
      allImages.map((image) => {
        apartmentImages.push(image.filename);
      });
      const apartment = new Apartment({
        houseTitle: req.body.houseTitle,
        description: req.body.description,
        houseRules: req.body.houseRules,
        amount: req.body.amount,
        address: req.body.address,
        owner: req.user.id,
        image: apartmentImages,
        city: req.body.city,
        state: req.body.state,
        roomCondition: req.body.roomCondition,
      });

      await apartment.save().then((result) => {
        // console.log(result);
        res.status(201).send({
          message: "Apartment has been created",
          data: result,
        });
      }).catch((err) => {
        // console.log(err);
        res.status(400).send({
          message: "Apartment could not be created",
          error: err,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: error.message,
    });
  }
});

// read an apartment
exports.view = async (req, res, next) => {
  try {
    // get all the data from the request
    let role;
    if(req.user){
       role = req.user.role;
    }
    const apartment = await Apartment.findById(req.params.id);
    
    console.log(apartment);

    // check if the apartment exists
    if (!apartment) {
      return res.status(404).send({
        success: false,
        message: "No apartment found",
      });
    }

    // check if the user is a guest and show the apartment
    if (role == "user" || !role) {
      if (checks.apartmentsStatus(apartment)) {
        return res.status(200).send({
          message: "Apartment is available for user booking",
          data: apartment,
        });
      } else {
        return res.status(200).send({
          message: "Apartment is not available for user booking",
          status: "failed"
        });
      }
    }

    // check if the user is a landlord or admin, and show all of the apartment
    if (role === "landlord" || role === "admin") {
      return res.status(200).send({
        message: "Apartment is available for only Admins and Landlords to view",
        data: apartment,
      });
    }
  } catch (error) {
    // server errors
    res.status(500).send({
      message: error.message,
    });
  }
};

// read all apartments
exports.viewAll = async (req, res, next) => {
  try {
    // get all the data from the request
    const apartments = await Apartment.find();
    if (!apartments) {
      return res.status(404).send({
        message: "No apartments found",
      });
    }
    res.status(200).send({
      message: "All apartments are available",
      data: apartments,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};