const Apartment = require("../models/apartment.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const checks = require("../utils/checks");

// create an apartment
exports.register = catchAsync(async (req, res, next) => {
  const allImages = req.files;
  const {
    houseTitle,
    description,
    houseRules,
    amount,
    address,
    city,
    roomCondition,
    state
  } = req.body;
  let apartmentImages = [];
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
    
    allImages.map((image) => {
      apartmentImages.push(image.filename);
    });
  }
  const apartment = new Apartment({
    houseTitle: req.body.houseTitle,
    description: req.body.description,
    houseRules: req.body.houseRules,
    amount: req.body.amount,
    address: req.body.address,
    user: req.user.id,
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
});



// read an apartment
exports.view = async (req, res, next) => {
  try {
    // get all the data from the request
    const role = req.user?.role || 'user';
    const apartment = await Apartment.findById(req.params.id).populate("user");

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
      return res.status(200).send({
        message: "Apartment is available for user booking",
        data: apartment,
      });
      
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
    const apartments = await Apartment.find().populate("user");
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

// update an apartment
exports.update = async (req, res, next) => {
  // console.log("update an apartment");
  res.status(200).send({
    message: "an apartment has been updated",
  });
};

// delete/disable an apartment
exports.remove = async (req, res, next) => {
  // console.log("an apartment has been deleted.");
  res.status(200).send({
    message: "an apartment has been deleted",
  });
};

// enable an apartment
exports.enable = async (req, res) => {
  try{
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).send({
        status: "error",
        message: "No apartment found",
      });
    }
    apartment.isEnabled = true;
    apartment.save();
    res.status(200).send({
      status: "success",
      message: "apartment has been enabled",
    });
  }catch(error){
    res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

// disable an apartment
exports.disable = async (req, res) => {
  try{
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).send({
        success: "error",
        message: "No apartment found",
      });
    }
    apartment.isEnabled = false;
    apartment.save();
    res.status(200).send({
      status: "success",
      message: "apartment has been disabled",
    });
  }catch(error){
    res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};