require('dotenv').config();
const connectDB = require('./services/db');
const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const path = require('path');

const Friendship = require('./models/Friendship');
const User = require('./models/User');

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

cron.schedule('* * * * *', async () => {
  const reminderTime = new Date(Date.now() - 60 * 60 * 1000);

  const friendships = await Friendship.find({
    lastSeen: { $lte: reminderTime },
  }).populate({ path: 'users', model: 'User', select: 'name email' });

  console.log(friendships);

  const reminders = {};

  friendships.map((friendship) => {
    if (!friendship.reminded) {
      const [user1, user2] = friendship.users;
      const user1Id = user1._id;
      const user2Id = user2._id;
      if (!reminders[user1Id]) {
        reminders[user1Id] = {};
        reminders[user1Id].people = [user2];
        reminders[user1Id].email = user1.email;
        reminders[user1Id].name = user1.name;
      } else {
        reminders[user1Id].people.unshift(user2);
      }
      if (!reminders[user2Id]) {
        reminders[user2Id] = {};
        reminders[user2Id].people = [user1];
        reminders[user2Id].email = user2.email;
        reminders[user2Id].name = user2.name;
      } else {
        reminders[user2Id].people.unshift(user1);
      }
    }
  });

  // Configure nodemailer

  // Configure nodemailer

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'intouchmailerapp@gmail.com',
      pass: process.env.EMAILPASSWORD,
    },
  });

  for (const key in reminders) {
    if (reminders.hasOwnProperty(key)) {
      user = reminders[key];
      console.log('user: ' + JSON.stringify(user));

      const mailOptions = {
        from: 'intouchmailerapp@gmail.com',
        to: user.email,
        subject: 'Your inTouch Reminders',
        text: `Make sure to hang out with: ${user.people.map(
          (person) => person.name
        )}`,
      };

      transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', res);
        }
      });
    }

    friendships.map(async (friendship) => {
      friendship.reminded = true;
      await friendship.save();
    });
  }

  console.log(reminders);
});

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/friendships', require('./routes/api/friendships'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
