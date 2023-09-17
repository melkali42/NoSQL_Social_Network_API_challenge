const router = require("express").Router();

const { getAllThoughts, getThouhgtById addThought, getAllUsers, getUserById, updateUser, } = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser);

// 

module.exports = router;