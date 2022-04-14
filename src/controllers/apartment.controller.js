const Apartment = require("../models/apartment");
const catchAsync = require("../utils/catchAsync");

// create an apartment
exports.register = catchAsync( async (req, res, next) => {
   const allImages = req.files;
   console.log(allImages.length);

   if(allImages.length !== 5 ) {
      return res.status(400).send({
        message: "You must upload 5 images",
      });
   }
   if(allImages.length === 5) {
    let apartmentImages = [];
   allImages.map((image) => apartmentImages.push(image.filename));
    console.log(apartmentImages);

    const apartment = new Apartment({
      houseTitle: req.body.houseTitle,
      description: req.body.description,
      houseRules: req.body.houseRules,
      amount: req.body.amount,
      address: req.body.address,
      owner: "Kachi",
      image: apartmentImages,
      city: req.body.city,
      state: req.body.state,
      roomCondition: req.body.roomCondition,
    });

    await apartment.save().then((result) => {
      console.log(result);
      res.status(201).send({
        message: "Apartment has been created",
        data: result,
      });
    }).catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Apartment could not be created",
        error: err,
      });
    });
   }
});



// read an apartment
exports.view = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if(!apartment) {
      return res.status(404).send({
        message: "Apartment not found",
      });
    }
    res.status(200).send({
      message: "an apartment has been fetched",
      data: apartment,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// read all apartments
exports.viewAll = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    if(!apartments) {
      return res.status(404).send({
        message: "No apartments found",
      });
    }
    res.status(200).send({
      message: "all apartments have been fetched",
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
  console.log("update an apartment");
  res.status(200).send({
    message: "an apartment has been updated",
  });
};

// delete/disable an apartment
exports.remove = async (req, res, next) => {
  console.log("an apartment has been deleted.");
  res.status(200).send({
    message: "an apartment has been deleted",
  });
};