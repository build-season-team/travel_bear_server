const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/apartment", require("./apartment.route"));

module.exports = router;
