const router = require("express").Router();
const upload = require("../middlewares/multer.middleware");
const { protect } = require("../middlewares/auth.middleware");
const {
  addBank,
  deleteBank,
} = require("./../controllers/bank.controller");

router.post("/register", protect, addBank);
router.put("/delete", protect, deleteBank);

module.exports = router;
