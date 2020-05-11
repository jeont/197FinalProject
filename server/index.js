require('dotenv').config();
const connectDB = require('./services/db');
const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.set('useFindAndModify', false);

connectDB();

// Use bodyparser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

const whiteList = ['http://localhost:3000'];

// Configure cross-origin browser
app.use(
  cors({
    origin: (origin, callback) =>
      !origin || whiteList.includes(origin)
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS')),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/friendships', require('./routes/api/friendships'));

app.get('/', (req, res) => {
  res.send('API Test Route. Hello world!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
