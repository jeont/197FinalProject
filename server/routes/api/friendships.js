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

    res.json({ addedId: idToAdd });
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

// Get user friend ids
router.get('/', auth, async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id);

  try {
    const friendships = await Friendship.find({
      users: userId,
    });

    const ids = friendships
      .map((friendship) => friendship.users)
      .flat()
      .filter((id) => {
        return id != userId.toString();
      });

    res.json(ids);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
