const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/apartment", require("./apartment.route"));
router.use("/review", require("./review.route"));

module.exports = router;
