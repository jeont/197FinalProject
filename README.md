# 197FinalProject
App for keeping track of which friends to (virtually) stay in touch with.

## Functionality

Sign up for an account and add a friend to start tracking - the date below their email represents the last time you saw them. You can update this date by clicking the "update last seen" button. If a week elapses and you haven't seen them, you will receive an email to the email you signed up with, addressed from intouchmailerapp@gmail.com, which contains a list of the people you haven't hung out with.

## Implementation Details

The email system is built using nodemailer and Heroku Scheduler. Every ten minutes (or so, Heroku Scheduler doesn't make any guarantees), reminders.js will be executed. The remind function in reminders.js searches the database for any friendships which have a last updated time of more than a week ago, and generates and sends emails. 

The password encryption and authentication was developed using bcrypt and JWT auth, respectively. When a user logs in or registers, they are given a JWT token. In order to access any protected backend routes, this token must be attached as a header, which is done so automatically by the setAuthToken utility function.

The state manageement on the client side is implemented using Redux and Redux Toolkit, which simplifies action and reducer logic into a single createSlice function. This logic is visible in the client in the authSlice.js and usersSlice.js folders.
