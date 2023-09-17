const express = require("express");
const router = express.Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../../controllers/user-controller");

// Correct the POST route by adding the createUser function as a handler
router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
