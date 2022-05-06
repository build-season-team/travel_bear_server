const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const {
  addBank,
  deleteBank,
  getBank,
} = require("./../controllers/bank.controller");

router.use(protect);

router.get("/getbanks", getBank)
router.post("/addbank", addBank);
router.put("/delete", deleteBank);

module.exports = router;
