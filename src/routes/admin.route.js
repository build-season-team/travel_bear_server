const router = require("express").Router();
const { getAllUsers, getOneUser, enableUser, disableUser, verifyUser, getAllApartments, getOneApartment, enableApartment, disableApartment, deleteApartment, verifyApartment, verifyPayment, recoverApartment} = require("../controllers/admin.controller");

// USER
// get all users
router.get("/users", getAllUsers);
// get one user
router.get("/users/:id", getOneUser);
// enable user
router.put("/users/enable/:id", enableUser);
// disable user
router.put("/users/disable/:id", disableUser);
// user verification
router.put("/users/verify/:id", verifyUser);


// APARTMENT 
// get all apartments
router.get("/apartments", getAllApartments);
// get one apartment
router.get("/apartments/:id", getOneApartment);
// enable apartment
router.put("/apartments/enable/:id", enableApartment);
// disable apartment
router.put("/apartments/disable/:id", disableApartment);

// delete apartment
router.delete("/apartments/delete/:id", deleteApartment);
// recover deleted apartment
router.put("/apartments/recover/:id", recoverApartment);

// verification
router.put("/apartments/verify/:id", verifyApartment);

// PAYMENT 
// withdrawal verification
router.put("/payments/withdrawal/:id", verifyPayment);


module.exports = router;