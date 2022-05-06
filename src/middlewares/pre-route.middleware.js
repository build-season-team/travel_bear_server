const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

module.exports = (app) => {
  app.use(cors());
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, `public`)));
  app.use("/uploads", express.static("public/uploads"));

  return app;
};
