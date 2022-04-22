const User = require("../models/user.model");
const Apartment = require("../models/apartment.model");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({
      status: "failed",
      message: "No users found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

exports.getOneUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "No user found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.enableUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "No user found",
    });
  }
  if (user.isEnabled == true) {
    return res.status(200).json({
      status: "failed",
      message: "User is already enabled",
    });
  } else {
    user.isEnabled = true;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "User is successfully enabled",
    });
  }
};

exports.disableUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "No user found",
    });
  } else {
    if (user.isEnabled == true) {
      user.isEnabled = false;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "User is successfully disabled",
      });
    } else {
      return res.status(200).json({
        status: "failed",
        message: "User is already disabled",
      });
    }
  }
};


exports.verifyUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "No user found",
    });
  } else {
    if (user.isVerified == true) {
      return res.status(200).json({
        status: "failed",
        message: "User is already verified",
      });
    } else {
      user.isVerified = true;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "User is verified",
      });
    }
  }
};

exports.getAllApartments = async (req, res, next) => {
  const apartments = await Apartment.find();
  if (!apartments) {
    return res.status(404).json({
      status: "failed",
      message: "No apartments found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        apartments,
      },
    });
  }
};


exports.getOneApartment = async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    return res.status(404).json({
      status: "failed",
      message: "No apartment found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        apartment,
      },
    });
  }
};


exports.enableApartment = async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    return res.status(404).json({
      status: "failed",
      message: "No apartment found",
    });
  } else {
    if (apartment.isEnabled == true) {
      return res.status(200).json({
        status: "failed",
        message: "Apartment is already enabled",
      });
    } else {
      apartment.isEnabled = true;
      await apartment.save();
      res.status(200).json({
        status: "success",
        message: "Apartment is enabled",
      });
    }
  }
};


exports.disableApartment = async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    return res.status(404).json({
      status: "failed",
      message: "No apartment found",
    });
  } else {
    if (apartment.isEnabled == true) {
      apartment.isEnabled = false;
      await apartment.save();
      res.status(200).json({
        status: "success",
        message: "Apartment is disabled",
      });
    } else {
      return res.status(200).json({
        status: "failed",
        message: "Apartment is still enabled",
      });
    }
  }
};


exports.deleteApartment = async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    return res.status(404).json({
      status: "failed",
      message: "No apartment found",
    });
  } else {
    if(apartment.isDeleted == true){
      return res.status(400).json({
        status: "failed",
        message: "Apartment is already deleted",
      });
    }
    apartment.isDeleted = true;
    await apartment.save();
    res.status(200).json({
      status: "success",
      message: "Apartment successfully deleted",
    });
  }
};

exports.recoverApartment = async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    return res.status(404).json({
      status: "failed",
      message: "No apartment found",
    });
  } else {
    if(apartment.isDeleted == false){
      return res.status(400).json({
        status: "failed",
        message: "Apartment is already recovered",
      });
    }
    apartment.isDeleted = false;
    await apartment.save();
    res.status(200).json({
      status: "success",
      message: "Apartment successfully recovered",
    });
  }
};

exports.verifyApartment = async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
    return res.status(404).json({
      status: "failed",
      message: "No apartment found",
    });
  } else {
    if (apartment.isVerified == true) {
      return res.status(200).json({
        status: "failed",
        message: "Apartment is already verified",
      });
    } else {
      apartment.isVerified = true;
      await apartment.save();
      res.status(200).json({
        status: "success",
        message: "Apartment is verified",
      });
    }
  }
};

// how would the payment be verified?
exports.verifyPayment = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: "verifyPayment route has been successfully hit",
  });
};