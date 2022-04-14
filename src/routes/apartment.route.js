const router = require("express").Router();
const upload = require("../middlewares/multer");

const {register, view, viewAll, update, remove} = require("./../controllers/apartment.controller");
// upload.array('photos', 5)upload.single("image")

router.post("/register",upload.array("photos", 5), register);
router.get("/view", view);
router.get("/viewAll", viewAll);
router.put("/update", update);
router.put("/delete", remove);

module.exports = router;
