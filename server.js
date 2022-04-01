require("express-async-errors");
const app = require("express")();
const dotenv = require("dotenv");
const globalErrorHandler = require("./src/middlewares/error.middleware");
const AppError = require("./src/utils/appError");
const router = require("./src/routes/index");

dotenv.config({
  path: "./config.env",
});
const PORT = process.env.PORT;

// Pre-route middlewares
require("./src/middlewares/pre-route.middleware")(app);

// API routes
app.use("/api", router);

// Ping route for testing connection
app.get("/ping", (req, res) => res.status(200).send("Hello world!"));

// Not Found route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error middlewares
app.use(globalErrorHandler);

// Listen to server port
app.listen(PORT, async () => {
  //Initialize MongoDB
  await require("./src/config/db.config")();
  console.log(
    `:::> Server listening on port ${PORT} @ http://localhost:${PORT}<::`
  );
});

// On  server error
app.on("error", (error) => {
  console.error(`<::: An error occurred on the server: \n ${error}`);
});

// module.exports = app;
