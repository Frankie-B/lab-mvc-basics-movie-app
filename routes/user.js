const express = require('express');
const app = express();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// GET request for user route
app.get('/signup', (req, res) => {
  res.render('user/signup');
});

//User signup with auth.        |---------- to run middleware to better handle the errors
app.post('/signup', (req, res, next) => {
  const { username, password } = req.body; // ES6 destructuring syntax
  bcrypt.hash(password, 10, function(error, hash) {
    if (error) {
      next('Hashing error'); // next() - error message.
    } else {
      User.create({
        // add file_upload here
        username: username,
        password: hash, // -> hashing the user created password before it goes to the db
      })
        .then(user => {
          res.redirect('/user/login'); // -> Redirecting to the user login.hbs page.
        })
        .catch(error => {
          res.send('User not create', error);
        });
    }
  });
});

// GET/POST for the user login
app.get('/login', (req, res) => {
  res.render('user/login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body; // -> ES6 destructuring
  User.findOne({
    username: username, // shorthand notation of this would be just username,
  })
    .then(user => {
      if (!user) {
        // if the username is not correct
        res.send('Invalid Credentials');
      } else {
        bcrypt.compare(password, user.password, function(
          error,
          correctPassword
        ) {
          if (error) {
            next('Hash compare error');
          } else if (!correctPassword) {
            // if the password is incorrect
            res.send('Invalid Credentials');
          } else {
            req.session.currentUser = user;
            res.redirect('/movies'); // -> if comparison passes then redirect to the movies page
          }
        });
      }
    })
    .catch(error => {
      res.send('Error not logged in');
    });
});

module.exports = app;
