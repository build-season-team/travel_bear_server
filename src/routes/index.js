const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/apartment", require("./apartment.route"));
router.use("/review", require("./review.route"));
router.use("/admin", require("./admin.route"));
router.use("/bank", require("./bank.route"));
router.use("/transaction", require("./transaction.route"));
router.use("/booking", require("./booking.route"));


module.exports = router;
