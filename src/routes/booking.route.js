const router = require("express").Router();
const upload = require("../middlewares/multer.middleware");
const { protect } = require("../middlewares/auth.middleware");
const { getPaymentLink, verify } = require("./../controllers/booking.controller");

router.post("/getlink", getPaymentLink);
router.get("/verify",  verify);

module.exports = router;
