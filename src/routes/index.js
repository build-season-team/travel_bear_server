const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/apartment", require("./apartment.route"));
router.use("/review", require("./review.route"));
router.use("/admin", require("./admin.route"));


module.exports = router;
