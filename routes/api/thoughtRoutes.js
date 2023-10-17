const router = require("express").Router();
const{
    getAllThoughts,
    getThoughtById,
    addThought,
   
   removeThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post( addThought);
router.route("/:thoughtId").get(getThoughtById).delete(removeThought);
//.route("/:thoughtId/reactions").post(addReaction);
//.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
    
    





