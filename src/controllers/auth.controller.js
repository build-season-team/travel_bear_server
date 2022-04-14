const {signUp, signin} = require("../services/auth.service");

exports.register = async (req, res, next) => {
  console.log(process.env.NODE_ENV);
  const data = await signUp(req.body, next);
  res.status(201).json({
    ...data
  });
};



exports.login = async (req, res, next) => {
  const data = await signin(req.body, next);
  res.status(200).json({
    data,
  });
};


