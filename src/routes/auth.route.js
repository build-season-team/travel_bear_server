const router = require("express").Router();
const {register} = require("./../controllers/auth.controller");

router.post("/signup", register);

module.exports = router;
