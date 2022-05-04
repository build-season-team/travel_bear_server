const router = require("express").Router();
const upload = require("../middlewares/multer.middleware");
const {protect} = require("../middlewares/auth.middleware");
const {register, view,  viewAll,update,remove} = require("./../controllers/apartment.controller");

router.post("/register", protect, upload, register);
router.get("/view/:id", view);
router.get("/viewAll", viewAll);
router.put("/update", protect, update);
router.put("/delete", protect, remove);

module.exports = router;