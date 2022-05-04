const router = require("express").Router();
const upload = require("../middlewares/multer.middleware");
const {protect} = require("../middlewares/auth.middleware");
const {register, view, book , viewAll} = require("./../controllers/apartment.controller");

router.post("/register", protect, upload, register);
router.get("/view/:id", protect, view);
router.get("/book/:id", protect, book);
router.get("/viewAll", protect, viewAll);

module.exports = router;