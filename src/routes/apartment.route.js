const router = require("express").Router();
const upload = require("../middlewares/multer.middleware");
const {protect, restrictTo} = require("../middlewares/auth.middleware");
const {register, view,  viewAll,update,remove ,enable, disable} = require("./../controllers/apartment.controller");

router.post("/register", protect, upload, register);
router.get("/view/:id", view);
router.get("/viewAll", viewAll);
router.put("/enable/:id", protect, restrictTo(landlord), enable );
router.put("/enable/:id", protect, restrictTo(landlord), disable );
router.put("/update", protect, update);
router.put("/delete", protect, remove);

module.exports = router;