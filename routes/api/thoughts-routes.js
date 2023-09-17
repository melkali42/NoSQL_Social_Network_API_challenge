const express = require("express");
const router = express.Router();

const { getAllThoughts, getThoughtById, addThought, removeThought } = require("../../controllers/user-controller");

router.route("/").get(getAllThoughts).post(addThought);

router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(removeThought);


module.exports = router;