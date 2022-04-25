const User = require("../models/user.model");
const Apartment = require("../models/apartment.model");

exports.getAllUsers = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};


// view single users endpoint by id
exports.getOneUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

exports.enableUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

exports.disableUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }

};


exports.verifyUser = async (req, res, next) => {
  try {
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
          message: "User is successfully verified",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

exports.getAllApartments = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }

};


exports.getOneApartment = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }

};


exports.enableApartment = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};


exports.disableApartment = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }

};


exports.deleteApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({
        status: "failed",
        message: "No apartment found",
      });
    } else {
      if (apartment.isDeleted == true) {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

exports.recoverApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({
        status: "failed",
        message: "No apartment found",
      });
    } else {
      if (apartment.isDeleted == false) {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

// apartments to be verified
exports.getAllApartmentsToBeVerified = async (req, res) => {
  try {
    const apartments = await Apartment.find({ isVerified: false });
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

exports.verifyApartment = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};

// how would the payment be verified?
exports.verifyPayment = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "verifyPayment route has been successfully hit",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
};