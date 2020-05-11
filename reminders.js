const nodemailer = require('nodemailer');
const Friendship = require('./models/Friendship');
const User = require('./models/User');
const connectDB = require('./services/db');

connectDB();

const remind = async () => {
  console.log('in function');

  const reminderTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  console.log('in function');

  const friendships = await Friendship.find({
    lastSeen: { $lte: reminderTime },
  }).populate({ path: 'users', model: 'User', select: 'name email' });

  console.log('in function');

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

    const friendPromises = friendships.map((friendship) => {
      friendship.reminded = true;
      return new Promise((resolve, reject) => {
        friendship.save((error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    });

    await Promise.all(friendPromises);
  }

  console.log(reminders);
};

remind()
  .then((result) => {
    console.log('ran reminders');
  })
  .catch((error) => {
    console.error(error.message);
  });
