const { Thought, User } = require('../models');

module.exports = {

  // Get all thoughts

  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve thoughts' });
    }
  },

  // Get thought by ID

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve thought' });
    }
  },

  // Create a new thought

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // Push to user's thoughts array

      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });

      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create thought' });
    }
  },

  // Update a thought by ID

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update thought' });
    }
  },

  // Delete a thought by ID

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      // Remove the thought's ID from the associated user's thoughts array

      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete thought' });
    }
  },

  // Add a reaction

  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add reaction' });
    }
  },

  // Remove a reaction
  
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove reaction' });
    }
  },
};
