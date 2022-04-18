const router = require("express").Router();
const upload = require("../middlewares/multer");
const {protect} = require("../middlewares/auth.middleware");
const {register,view,  viewAll,update,remove} = require("./../controllers/apartment.controller");

router.post("/register", protect, upload, register);
router.get("/view", view);
router.get("/viewAll", viewAll);
router.put("/update", update);
router.put("/delete", remove);

module.exports = router;