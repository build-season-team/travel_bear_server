const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { createTranscaction, getTransactions } = require("./../controllers/transaction.controller");

router.use(protect)

router.get("/gettransactions", getTransactions);

router.post("/withdraw", createTranscaction);

module.exports = router;
