const router = require("express").Router();
const upload = require("../middlewares/multer.middleware");
const { protect } = require("../middlewares/auth.middleware");
const { getPaymentLink, verify, getBooking } = require("./../controllers/booking.controller");

router.post("/getlink", getPaymentLink);
router.get("/verify",  verify);

router.use(protect)

router.get('/bookings', getBooking);

module.exports = router;
