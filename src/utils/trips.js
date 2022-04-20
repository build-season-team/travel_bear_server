const Trips = require("../models/trips");
const Apartment = require("../models/apartment");
const User = require("../models/user");

exports.createTrip = async (req, res, next) => {
  const apartment = await Apartment.findById(req.body.apartmentId);
  if (!apartment) {
    return res.status(404).json({
      message: "Apartment not found",
    });
  }
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const trip = await Trips.create({
    apartment: req.body.apartmentId,
    owner: req.userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    price: req.body.apartment.amount,
    status: "pending",
  });
  apartment.trips.push(trip);
  apartment.save();
  user.trips.push(trip);
  user.save();
  res.status(201).json({
    message: "Trip created successfully",
    trip: trip,
  });
};


