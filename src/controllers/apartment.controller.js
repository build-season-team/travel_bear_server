const Apartment = require("../models/apartment");

// create an apartment
exports.register = async (req, res, next) => {
  console.log("create an apartment");
};

// read an apartment
exports.view = async (req, res, next) => {
  console.log("view an apartment");
  res.status(200).send({
    message: "single apartment has been fetched",
  });
};

// read all apartments
exports.viewAll = async (req, res, next) => {
  console.log("view an apartment");
  res.status(200).send({
    message: "All apartments have been fetched",
  });
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