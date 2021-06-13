const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mongoose = require("mongoose");

const validate = require('../../utils/validate');
const signToken = require('../../utils/signToken')
const User = require('../../models/User');

router.get('/currentUser', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    // id: req.user.id,
    username: req.user.username
  });
});

router.post('/register', (req, res) => {
  console.log('Register:');
  console.log(req.body);
  const { errors, isValid } = validate.registerInput(req.body);
  const rememberMe = req.body.rememberMe;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username is taken" });
    }

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          password: hash,
        });

        newUser.save()
          .then(e => {
            const payload = {
              username: newUser.username,
              userId: newUser._id
            }
            signToken(payload, rememberMe).then(signed => res.json({ token: signed.token, ...payload })).catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      });
    });
  })
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validate.loginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  const rememberMe = req.body.rememberMe;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ username: "Username does not exist" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          username: user.username,
          userId: user._id,
        };

        signToken(payload, rememberMe).then(signed => res.json({ token: signed.token, ...payload })).catch(err => console.log(err))

      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;