const router = require("express").Router();
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriends,
    removeFriends,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriends).delete(removeFriends)




    module.exports = router;








