const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Friendships test route. Hello world!');
});

module.exports = router;
