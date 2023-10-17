const { User } = require("../models");

const UserController = {
    getAllUsers(req, res) {
        User.find({})
        .sort({ _id: -1 })
        .then((dbUserdata) => res.json(dbUserdata))
        .catch((err) => {
            console.log.apply(err);
            res.status(500).json(err);
        });
    },
    getUserById(req, res) {
        User.findOne({ _id:req.params.userId })
        .select("-_v")
        .populate('friends')
        .populate(
            "thoughts")
        .then((dbUserdata) => {
            if (!dbUserdata) {
                res.status(404).json({ message: "No users dound with this id!"});
                
            }
            res.json(dbUserdata);
        })
        .catch((err) => {
            console.log.apply(err);
            res.status(400).json(err);
        });
    },
    createUser (req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      },
      deleteUser({ params }, res) {
        //   await
        //   thought.DeleteMany({ userId: params.id }),
        User.findOneAndDelete({ _id: params.userId })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      },
      addFriends (req,res) {
        console.log("route hit");
          User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { friends: req.params.friendId } },
              { new: true }
          )
          .then((dbUserData) => {
              if (!dbUserData) {
                  res.status(404).json({ message: "No user found with this id!" });
              }
              res.json(dbUserData);
          })
          .catch((err) => {
              res.status(400).json(err);
          });
      },
      removeFriends(req,res){
          User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
          )
          .then((dbUserData) => {
              if (!dbUserData) {
                  res.status(404).json({ message: "No user found with this id!" });
                  return;
              }
              res.json(dbUserData);
          })
          .catch((err) => {
              res.status(400).json(err);
          });
      }
};

module.exports = UserController;