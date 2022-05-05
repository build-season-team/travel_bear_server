const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { createTranscaction } = require("./../controllers/transaction.controller");

router.use(protect)

router.post("/withdraw", createTranscaction);

module.exports = router;
