const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
      })
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(400).json(err);
      });        
    },

    getThoughtById ({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: "thoughts",
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No thoughts found by that id"});
                return;
            }
            res.json(dbUserData);
        });
    },

    addThought({ params, body }, res) {
        Thought.create(body)
          .then(({ _id }) => {
            console.log(_id);
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then((deletedThought) => {
            if (!deletedThought) {
              return res.status(404).json({ message: "No thought with this id!" });
            }
            console.log(deletedThought);
            User.findOneAndUpdate(
              { username: deletedThought.username },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            ).then((dbUserData) => {
              if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
              }
              res.json(dbUserData);
            });
          })
          .catch((err) => res.json(err));
      },
};

module.exports = thoughtController;