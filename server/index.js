const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.set('useFindAndModify', false);

// Use bodyparser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Test Route. Hello world!');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
