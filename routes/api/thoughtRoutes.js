const router = require("express").Router();
const { User, Thought } = require("../../models");

// combine GET all and POST for single user
router.route("/")
    .get(async (req, res) => {
        try {
            const userData = await User.find({});
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    })

// combine GET single, PUT, and DELETE for single user
router.route("/:userId")
    .get(async (req, res) => {
        try {
            const userData = await User.findById(req.params.userId);
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json("Unexpected error!");
        }
    })
    .put(async (req, res) => {
        try {
            const userData = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }    
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json("Unexpected error!");
        }
    })
    .delete(async (req, res) => {
        try {
            const userData = await User.findByIdAndDelete(req.params.userId);
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json("User deleted!");
        } catch (err) {
            res.status(500).json("unexpected error!");
        }
    });

// POST and DELETE for friend
router.route("/:userId/friends/:friendId")
    .post(async (req, res) => {
        try {
            const userData = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json("Unexpected error!");
        }
    })

    .delete(async (req, res) => {
        try {
            const userData = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json("Unexpected error!");
        }
    });

module.exports = router;
    
    





