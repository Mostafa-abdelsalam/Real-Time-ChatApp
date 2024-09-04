const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');



router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User Already Exists' })
        }
        user = new User({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ msg: 'Unauthorized', info });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ msg: 'Logged in successfully', user });
      });
    })(req, res, next);
  });

module.exports = router;
