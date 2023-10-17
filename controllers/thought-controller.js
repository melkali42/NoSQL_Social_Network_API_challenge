const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(400).json(err);
      });        
    },

    getThoughtById ({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
      
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No thoughts found by that id"});
                return;
            }
            res.json(dbUserData);
        });
    },

    addThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
           
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thought._id } },
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
              {thoughts: req.params.thoughtId },
              { $pull: { thoughts:req.params.thoughtId } },
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