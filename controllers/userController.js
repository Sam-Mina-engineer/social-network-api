const { User, Thought } = require('../models');

module.exports = {

  // Get all users

  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  // Get a single user by ID

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  },

  // Create a new user

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  // Update a user by ID

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // Delete a user by ID

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      // Remove user's associated thoughts

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

  // Add a friend to a user's friend list

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add friend' });
    }
  },

  // Remove a friend from a user's friend list
  
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to remove friend' });
    }
  },
};
