const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Friendship = require('../../models/Friendship');
const mongoose = require('mongoose');

// Add friends route
router.post('/:idToAdd', auth, async (req, res) => {
  const { idToAdd } = req.params;

  friendshipArray = [req.user.id, idToAdd].sort();

  try {
    friendship = new Friendship({ users: friendshipArray });

    await friendship.save();

    res.json({ addedId: idToAdd, friendship });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Remove friend
router.delete('/:idToRemove', auth, async (req, res) => {
  const { idToRemove } = req.params;

  const friendshipArray = [req.user.id, idToRemove].sort();

  try {
    friendship = await Friendship.deleteOne({
      users: { $all: friendshipArray },
    });

    res.json({ removedId: idToRemove });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get user friends and friendships by id
router.get('/', auth, async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id);

  try {
    const friendships = await Friendship.find({
      users: userId,
    });

    const friendIds = friendships
      .map((friendship) => friendship.users)
      .flat()
      .filter((id) => {
        return id != userId.toString();
      });

    const friendshipsById = friendships.reduce(
      (friends, friend) => (
        (friends[friend.users.filter((id) => friendIds.includes(id))] = friend),
        friends
      ),
      {}
    );

    res.json({ friendIds, friendshipsById });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// updateLastSeen
router.put('/:idToUpdate', auth, async (req, res) => {
  const { idToUpdate } = req.params;
  const { id } = req.user;

  try {
    friendshipArray = [id, idToUpdate].sort();

    const friendship = await Friendship.findOneAndUpdate(
      {
        users: { $all: friendshipArray },
      },
      { $set: { lastSeen: Date.now(), reminded: false } }
    );

    if (!friendship) {
      res.status(404).send('Friendship not found.');
    }

    res.json({ idToUpdate, friendship });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
