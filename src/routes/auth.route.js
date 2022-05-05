const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const {register, login, getme} = require("./../controllers/auth.controller");

router.post("/signup", register);
router.post("/signin", login);
router.get("/getme", protect, getme);

module.exports = router;
