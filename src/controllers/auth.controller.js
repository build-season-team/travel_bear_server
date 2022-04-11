const {signUp} = require("../services/auth.service");

  exports.register = async (req, res, next) => {
    console.log(process.env.NODE_ENV);
    const data = await signUp(req.body, next);
    res.status(201).json({
      ...data
    });
  }


